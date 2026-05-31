import { Twitter, Linkedin, Github } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Demo', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Support: ['Documentation', 'FAQ', 'Contact', 'Status'],
}

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/08">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Integrit logo"
                className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(195,255,51,0.5)]"
              />
              <span className="font-display text-2xl text-white tracking-wider">INTEGRIT</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              AI-powered multilingual caption generation plugin for Adobe Premiere Pro & After Effects. Build faster. Reach further.
            </p>
            <div className="flex gap-4 mt-6">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-text-muted hover:text-white text-sm transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/08 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} Integrit. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-text-muted hover:text-white text-xs transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-text-muted text-xs font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
