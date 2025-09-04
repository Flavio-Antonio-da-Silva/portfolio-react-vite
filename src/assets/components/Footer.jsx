import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-blue-400 text-center p-4 mt-8">
      <p>&copy; {new Date().getFullYear()} Flavusdevoper. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;