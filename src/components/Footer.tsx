import React from 'react';
import { Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Qur'ān Companion</h3>
            <p className="text-neutral-300 text-sm">
              A digital platform designed to enhance your Qur'ān study experience with rich insights, 
              translations, and contextual information.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Help & FAQs</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Contribute</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} Qur'ān Companion. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Made with <Heart size={14} className="mx-1 text-error-500" /> for the Ummah
          </p>
        </div>
      </div>
    </footer>
  );
}