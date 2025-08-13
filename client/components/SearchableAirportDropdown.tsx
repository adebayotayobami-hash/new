import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Airport } from "@shared/api";

interface SearchableAirportDropdownProps {
  airports: Airport[];
  value: string;
  onChange: (airportCode: string) => void;
  placeholder: string;
  excludeCode?: string;
  className?: string;
  error?: boolean;
}

export default function SearchableAirportDropdown({
  airports,
  value,
  onChange,
  placeholder,
  excludeCode,
  className = "",
  error = false
}: SearchableAirportDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>(airports);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter airports based on search term and excluded airport
  useEffect(() => {
    let filtered = airports.filter(airport => 
      airport.code !== excludeCode &&
      (airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
       airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       airport.country.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredAirports(filtered);
  }, [searchTerm, airports, excludeCode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedAirport = airports.find(airport => airport.code === value);

  const handleSelect = (airport: Airport) => {
    onChange(airport.code);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearchTerm("");
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Selected Value Display */}
      <div
        onClick={handleOpen}
        className={`w-full bg-white border rounded p-4 text-gray-600 cursor-pointer flex items-center justify-between ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
      >
        <span className={selectedAirport ? 'text-gray-900' : 'text-gray-500'}>
          {selectedAirport 
            ? `${selectedAirport.city} (${selectedAirport.code}) - ${selectedAirport.name}`
            : placeholder
          }
        </span>
        <div className="flex items-center gap-2">
          {selectedAirport && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search airports, cities, or codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Airport List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredAirports.length > 0 ? (
              filteredAirports.slice(0, 50).map((airport) => (
                <div
                  key={airport.code}
                  onClick={() => handleSelect(airport)}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {airport.city} ({airport.code})
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {airport.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {airport.country}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {airport.code}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                No airports found matching "{searchTerm}"
              </div>
            )}
            {filteredAirports.length > 50 && (
              <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 text-center">
                Showing first 50 results. Continue typing to narrow search.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
