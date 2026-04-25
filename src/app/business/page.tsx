'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Phone, MapPin, Tag, Store, Search } from 'lucide-react';
import { businessListings, promoBanners } from '@/data/mockBusinesses';
import AdCarousel from '@/components/AdCarousel';
import { BusinessCardSkeleton } from '@/components/SkeletonLoader';

const businessCategories = ['All', 'Electronics', 'Food', 'Clothing', 'Construction', 'Pharmacy', 'Travel'];

export default function BusinessPage() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(timer); }, []);

  const filteredBusinesses = businessListings.filter(business => {
    const matchesCategory = activeFilter === 'All' || business.category === activeFilter;
    const matchesSearch = searchQuery === '' || business.name.toLowerCase().includes(searchQuery.toLowerCase()) || business.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || business.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-4 transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-4 h-4" /><span>Back to Home</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(243, 112, 33, 0.1)' }}>
            <Store className="w-6 h-6" style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>స్థానిక వ్యాపారాలు</h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Local Business Directory</p>
          </div>
        </motion.div>
      </div>

      <section className="mb-8"><AdCarousel /></section>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <input type="text" placeholder="Search businesses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
            style={{ backgroundColor: 'var(--bg-parchment)', border: '1px solid rgba(243, 112, 33, 0.1)', color: 'var(--text-primary)' }} />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {businessCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
              style={activeFilter === cat ? { backgroundColor: 'var(--primary)', color: 'white' } : { backgroundColor: 'var(--bg-sage)', color: 'var(--text-secondary)' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <BusinessCardSkeleton key={i} />)}
        </div>
      ) : filteredBusinesses.length === 0 ? (
        <div className="text-center py-20">
          <Store className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No businesses found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBusinesses.map((business, i) => (
            <motion.div key={business.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl overflow-hidden transition-shadow hover:shadow-elevated" style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={business.imageUrl} alt={business.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                {business.offer && <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1" style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--text-primary)' }}><Tag className="w-3 h-3" />{business.offer}</div>}
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{business.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'Ramabhadra, sans-serif' }}>{business.name}</h3>
                  <span className="px-2 py-0.5 text-[10px] rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--bg-sage)', color: 'var(--text-tertiary)' }}>{business.category}</span>
                </div>
                <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{business.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}><MapPin className="w-3 h-3 flex-shrink-0" /><span className="line-clamp-1">{business.address}</span></div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}><Phone className="w-3 h-3 flex-shrink-0" /><span>{business.phone}</span></div>
                </div>
                <button className="mt-4 w-full py-2.5 text-white text-sm font-medium rounded-xl transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--primary)' }}>Contact Business</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-10 mb-8">
        <div className="ad-slot"><span className="text-sm font-medium">Advertise Your Business Here</span></div>
      </div>
    </div>
  );
}
