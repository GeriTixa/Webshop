import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-background text-foreground py-6 mt-8 flex-shrink-0 border-t border-gray-200">
            <div className="container mx-auto text-center">
                <p className="mb-4">&copy; {new Date().getFullYear()} Webshop Poc. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-400">Terms of Service</a>
                    <a href="#" className="hover:text-gray-400">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;