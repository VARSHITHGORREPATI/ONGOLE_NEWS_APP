'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Share2, Globe } from 'lucide-react';

const footerLinks = [
  { label: 'మా గురించి', labelEn: 'About Us', href: '/about' },
  { label: 'సంప్రదించండి', labelEn: 'Contact', href: '/contact' },
  { label: 'అడ్మిన్ ప్యానెల్', labelEn: 'Admin Panel', href: '/admin' },
  { label: 'గోప్యతా విధానం', labelEn: 'Privacy Policy', href: '/privacy' },
  { label: 'నిబంధనలు', labelEn: 'Terms', href: '/terms' },
];

const socialLinks = [
  { icon: Share2, href: '#', label: 'Facebook' },
  { icon: Share2, href: '#', label: 'Twitter' },
  { icon: Share2, href: '#', label: 'Instagram' },
  { icon: Globe, href: '#', label: 'Website' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-parchment)', borderTop: '1px solid rgba(243, 112, 33, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                <span className="text-2xl">🐂</span>
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
                  ఒంగోలు కనెక్ట్
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Ongole Connect</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              ప్రకాశం జిల్లా ప్రజలకు అందుబాటులో ఉండే స్థానిక వార్తా వనరు. తాజా వార్తలు, వ్యాపారాలు, ఆధ్యాత్మిక సమాచారం - అన్నీ ఒకే చోట.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                    {link.label}
                    <span className="ml-1 text-xs opacity-50">{link.labelEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <MapPin className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                <span>మెయిన్ రోడ్, ఒంగోలు, ప్రకాశం జిల్లా</span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Phone className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                <span>+91 85920 12345</span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Mail className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                <span>info@ongoleconnect.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-opacity-100"
                    style={{ backgroundColor: 'rgba(243, 112, 33, 0.1)', color: 'var(--primary)' }}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-6" style={{ borderTop: '1px solid rgba(243, 112, 33, 0.1)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>© 2026 Ongole Connect. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
              <Link href="/privacy" className="hover:opacity-80 transition-opacity">Privacy</Link>
              <Link href="/terms" className="hover:opacity-80 transition-opacity">Terms</Link>
              <Link href="/sitemap" className="hover:opacity-80 transition-opacity">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
