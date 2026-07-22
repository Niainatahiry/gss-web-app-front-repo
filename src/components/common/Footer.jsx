import React from 'react'
import logoSrc from '../../assets/logos/gss-logo-light.png'

function Footer() {
  return (
<footer className="bg-primary-100/5 ">
  <div className="max-w-7xl mx-auto px-6 py-16">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
      
      {/* Brand Column */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center gap-3">
          <div className="logo-container shrink-0">
            <img src={logoSrc} alt="GSS Logo" className="h-12 w-auto" />
          </div>
        </div>
        
        <p className="text-sm font-body leading-relaxed max-w-xs text-primary-300">
          Vous source la plus fiable en jeux-vidéos à Madagascar. 
        </p>
        
        {/* Suivez-nous */}
        <div className="space-y-3">
          <h4 className="text-xs font-display font-semibold uppercase tracking-wider text-primary-100">
            Suivez-nous
          </h4>
          <a 
            href="https://www.facebook.com/profile.php?id=61578280547049" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-primary-600 hover:bg-secondary-200 flex items-center justify-center transition-colors duration-300 group"
            aria-label="Facebook GSS - Gamessources Madagascar"
          >
            <svg className="w-4 h-4 text-primary-300 group-hover:text-primary-700 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Store Links */}
      <div className="lg:col-span-2">
        <h3 className="text-sm font-display font-semibold uppercase tracking-wider mb-5 text-primary-100">
          Store
        </h3>
        <ul className="space-y-3">
          {['Browse Games', 'Categories', 'Promotions', 'Accessories'].map((item) => (
            <li key={item}>
              <a href="#" className="text-sm font-body text-primary-300 hover:text-secondary-200 transition-colors duration-200">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Support Links */}
      <div className="lg:col-span-3">
        <h3 className="text-sm font-display font-semibold uppercase tracking-wider mb-5 text-primary-100">
          Customer Support
        </h3>
        <ul className="space-y-3">
          {['Contact Us', 'FAQ', 'How to Buy', 'Payment Methods', 'Game Activation', 'Refund Policy'].map((item) => (
            <li key={item}>
              <a href="#" className="text-sm font-body text-primary-300 hover:text-secondary-200 transition-colors duration-200">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Account Links */}
      <div className="lg:col-span-3">
        <h3 className="text-sm font-display font-semibold uppercase tracking-wider mb-5 text-primary-100">
          Account
        </h3>
        <ul className="space-y-3">
          {['My Account', 'My Orders', 'Wishlist', 'Login / Register'].map((item) => (
            <li key={item}>
              <a href="#" className="text-sm font-body text-primary-300 hover:text-secondary-200 transition-colors duration-200">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  </div>  

  {/* Bottom Bar */}
  <div className="border-t border-primary-500">
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-body text-primary-100">
          © 2026 GSS. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {['Terms of Service', 'Privacy Policy', 'Refund Policy'].map((item) => (
            <a 
              key={item}
              href="#" 
              className="text-sm font-body text-primary-100 hover:text-primary-300 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
</footer>
  )
}


export default Footer