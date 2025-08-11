import { RequestHandler } from "express";
import { SupportTicket, SupportTicketRequest } from "@shared/api";
import { z } from 'zod';

// Mock storage for support tickets
let supportTickets: SupportTicket[] = [];
let ticketIdCounter = 1;

// Validation schema for support ticket request
const supportTicketSchema = z.object({
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  category: z.enum(['booking', 'payment', 'technical', 'general'])
});

// Create new support ticket
export const handleCreateSupportTicket: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const validation = supportTicketSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ticket data',
        errors: validation.error.errors
      });
    }

    const { subject, message, priority, category } = validation.data;

    // Create support ticket
    const ticket: SupportTicket = {
      id: `ticket_${ticketIdCounter}`,
      userId: user.id,
      subject,
      message,
      status: 'open',
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    supportTickets.push(ticket);
    ticketIdCounter++;

    // Simulate auto-response for urgent tickets
    if (priority === 'urgent') {
      // In production, this would trigger immediate notifications to support team
      console.log(`URGENT TICKET CREATED: ${ticket.id} - ${subject}`);
    }

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Create support ticket error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get user's support tickets
export const handleGetUserSupportTickets: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    
    const userTickets = supportTickets
      .filter(ticket => ticket.userId === user.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json(userTickets);
  } catch (error) {
    console.error('Get support tickets error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get specific support ticket
export const handleGetSupportTicket: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { ticketId } = req.params;
    
    const ticket = supportTickets.find(t => t.id === ticketId && t.userId === user.id);
    
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Support ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Get support ticket error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update support ticket status (admin only)
export const handleUpdateSupportTicketStatus: RequestHandler = (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status, response } = req.body;
    
    const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const ticketIndex = supportTickets.findIndex(t => t.id === ticketId);
    
    if (ticketIndex === -1) {
      return res.status(404).json({ success: false, message: 'Support ticket not found' });
    }

    supportTickets[ticketIndex] = {
      ...supportTickets[ticketIndex],
      status,
      updatedAt: new Date().toISOString()
    };

    // In a real application, you would also store the admin response
    if (response) {
      console.log(`Admin response to ticket ${ticketId}: ${response}`);
    }

    res.json({ success: true, ticket: supportTickets[ticketIndex] });
  } catch (error) {
    console.error('Update support ticket error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Close support ticket (user can close their own tickets)
export const handleCloseSupportTicket: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { ticketId } = req.params;
    
    const ticketIndex = supportTickets.findIndex(t => t.id === ticketId && t.userId === user.id);
    
    if (ticketIndex === -1) {
      return res.status(404).json({ success: false, message: 'Support ticket not found' });
    }

    supportTickets[ticketIndex] = {
      ...supportTickets[ticketIndex],
      status: 'closed',
      updatedAt: new Date().toISOString()
    };

    res.json({ success: true, ticket: supportTickets[ticketIndex] });
  } catch (error) {
    console.error('Close support ticket error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all support tickets (admin only)
export const handleGetAllSupportTickets: RequestHandler = (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const priority = req.query.priority as string;

    let filteredTickets = supportTickets;
    
    if (status && status !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === status);
    }

    if (priority && priority !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.priority === priority);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTickets = filteredTickets
      .sort((a, b) => {
        // Sort by priority first (urgent -> high -> medium -> low), then by creation date
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(startIndex, endIndex);

    res.json({
      tickets: paginatedTickets,
      total: filteredTickets.length,
      page,
      limit,
      totalPages: Math.ceil(filteredTickets.length / limit)
    });
  } catch (error) {
    console.error('Get all support tickets error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get support ticket statistics (admin only)
export const handleGetSupportStats: RequestHandler = (req, res) => {
  try {
    const totalTickets = supportTickets.length;
    const openTickets = supportTickets.filter(t => t.status === 'open').length;
    const inProgressTickets = supportTickets.filter(t => t.status === 'in_progress').length;
    const resolvedTickets = supportTickets.filter(t => t.status === 'resolved').length;
    const closedTickets = supportTickets.filter(t => t.status === 'closed').length;

    const urgentTickets = supportTickets.filter(t => t.priority === 'urgent' && ['open', 'in_progress'].includes(t.status)).length;
    const highPriorityTickets = supportTickets.filter(t => t.priority === 'high' && ['open', 'in_progress'].includes(t.status)).length;

    const stats = {
      total: totalTickets,
      byStatus: {
        open: openTickets,
        in_progress: inProgressTickets,
        resolved: resolvedTickets,
        closed: closedTickets
      },
      byPriority: {
        urgent: urgentTickets,
        high: highPriorityTickets,
        activeHigh: urgentTickets + highPriorityTickets
      },
      responseTime: {
        average: '2.5 hours', // Mock data
        target: '4 hours'
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Get support stats error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
