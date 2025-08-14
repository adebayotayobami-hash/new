interface ServiceStatus {
  name: string;
  status: 'working' | 'error' | 'unknown';
  message: string;
  responseTime?: number;
}

interface ServiceCheckResult {
  services: ServiceStatus[];
  totalChecked: number;
  working: number;
  failed: number;
}

export class ServiceStatusChecker {
  private static readonly TIMEOUT = 5000; // 5 seconds timeout

  private static async checkEndpoint(url: string, serviceName: string): Promise<ServiceStatus> {
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);
      
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          name: serviceName,
          status: 'working',
          message: `✅ Service operational (${response.status})`,
          responseTime
        };
      } else {
        return {
          name: serviceName,
          status: 'error',
          message: `❌ Service returned error (${response.status})`,
          responseTime
        };
      }
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      if (error.name === 'AbortError') {
        return {
          name: serviceName,
          status: 'error',
          message: '⏱️ Service timeout (>5s)',
          responseTime
        };
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return {
          name: serviceName,
          status: 'error',
          message: '🌐 Network error or CORS issue',
          responseTime
        };
      } else {
        return {
          name: serviceName,
          status: 'error',
          message: `❌ Error: ${error.message}`,
          responseTime
        };
      }
    }
  }

  private static async checkSupabaseStatus(): Promise<ServiceStatus> {
    try {
      // Check if Supabase client is available and configured
      const { supabase } = await import('../lib/supabaseClient');
      
      if (!supabase) {
        return {
          name: 'Supabase Database',
          status: 'error',
          message: '❌ Supabase client not configured'
        };
      }

      // Try a simple health check
      const startTime = Date.now();
      const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });
      const responseTime = Date.now() - startTime;
      
      if (error) {
        return {
          name: 'Supabase Database',
          status: 'error',
          message: `❌ Database error: ${error.message}`,
          responseTime
        };
      } else {
        return {
          name: 'Supabase Database',
          status: 'working',
          message: '✅ Database connected and operational',
          responseTime
        };
      }
    } catch (error: any) {
      return {
        name: 'Supabase Database',
        status: 'error',
        message: `❌ Connection error: ${error.message}`
      };
    }
  }

  private static async checkInternalAPIs(): Promise<ServiceStatus[]> {
    const baseUrl = window.location.origin;
    const internalServices = [
      { endpoint: '/api/ping', name: 'API Server' },
      { endpoint: '/api/amadeus/health', name: 'Amadeus Flight API' },
      { endpoint: '/api/payments/stripe/config', name: 'Stripe Payment API' },
    ];

    const checks = internalServices.map(service => 
      this.checkEndpoint(`${baseUrl}${service.endpoint}`, service.name)
    );

    return Promise.all(checks);
  }

  public static async checkAllServices(): Promise<ServiceCheckResult> {
    console.log('🔍 Checking external services status...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━��━━━━━━━━━━━━━━━━━━');
    
    const services: ServiceStatus[] = [];
    
    try {
      // Check internal APIs
      const internalServices = await this.checkInternalAPIs();
      services.push(...internalServices);
      
      // Check Supabase
      const supabaseStatus = await this.checkSupabaseStatus();
      services.push(supabaseStatus);
      
      // Calculate summary
      const totalChecked = services.length;
      const working = services.filter(s => s.status === 'working').length;
      const failed = services.filter(s => s.status === 'error').length;
      
      // Log results
      services.forEach(service => {
        const timeStr = service.responseTime ? ` (${service.responseTime}ms)` : '';
        console.log(`${service.message}${timeStr} - ${service.name}`);
      });
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📊 Services Summary: ${working}/${totalChecked} working, ${failed} failed`);
      
      if (failed === 0) {
        console.log('🎉 All services are operational!');
      } else if (working > 0) {
        console.log('⚠️ Some services have issues - check configuration');
      } else {
        console.log('🚨 All services are down - check network and configuration');
      }
      
      return {
        services,
        totalChecked,
        working,
        failed
      };
      
    } catch (error) {
      console.error('❌ Service status check failed:', error);
      return {
        services: [{
          name: 'Service Checker',
          status: 'error',
          message: `❌ Failed to run service checks: ${error}`
        }],
        totalChecked: 1,
        working: 0,
        failed: 1
      };
    }
  }

  public static async logServiceStatus(): Promise<void> {
    try {
      await this.checkAllServices();
    } catch (error) {
      console.error('🚨 Critical error in service status checker:', error);
    }
  }
}

// Export for use in components
export const checkServicesOnLoad = () => ServiceStatusChecker.logServiceStatus();
