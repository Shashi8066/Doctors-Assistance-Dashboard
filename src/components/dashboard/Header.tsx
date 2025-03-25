
import React from 'react';
import { 
  Bell, 
  Calendar, 
  ChevronDown, 
  FileText, 
  Home, 
  LogOut, 
  Search, 
  Settings, 
  Users, 
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-medical-primary to-medical-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">MediAssist</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <a href="#" className="nav-link active">
            <Home size={18} />
            <span>Home</span>
          </a>
          <a href="http://localhost:5500/crc/pd.html" className="nav-link">
            <Users size={18} />
            <span>Patients</span>
          </a>
          <a href="http://localhost:5500/crc/assistance.html" className="nav-link">
            <Brain size={18} />
            <span>AI Assistant</span>
          </a>
    
        </nav>

        {/* Right Section: Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Trigger */}
          

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1 pr-3 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Dr. Steven Reynolds" />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <span className="text-sm font-medium hidden sm:inline">Dr. Steven Reynolds</span>
                  <ChevronDown size={16} className="ml-1 text-gray-500" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
             
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
