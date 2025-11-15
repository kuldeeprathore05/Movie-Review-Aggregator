import React from 'react';
import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react'; 

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md mb-8">
      <nav className="container mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
        
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-white transition-opacity hover:opacity-80"
        >
          <Clapperboard className="text-yellow-400" size={28} />
          
          CineGauge
        </Link>
        
      </nav>
    </header>
  );
};

export default Header;