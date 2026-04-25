'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, ShoppingBag, Sparkles, User } from 'lucide-react';

const bottomNavItems = [
  { href: '/', label: 'హోమ్', icon: Home },
  { href: '/category/local', label: 'వార్తలు', icon: Newspaper },
  { href: '/business', label: 'డీల్స్', icon: ShoppingBag },
  { href: '/spiritual', label: 'భక్తి', icon: Sparkles },
  { href: '/epaper', label: 'E-పేపర్', icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass" style={{ borderTop: '1px solid rgba(243, 112, 33, 0.1)' }}>
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
              style={{ color: isActive ? 'var(--primary)' : 'var(--text-tertiary)' }}
            >
              <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-opacity-15' : ''}`} style={isActive ? { backgroundColor: 'var(--primary)' } : {}}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
