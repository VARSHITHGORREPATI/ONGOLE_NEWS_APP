'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Eye, TrendingUp, Star, Search, Filter } from 'lucide-react';
import { Article, CategoryType } from '@/types';
import { categories } from '@/data/mockArticles';
import { getAllArticles, createArticle, updateArticle, deleteArticle } from '@/lib/articleStorage';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function AdminPanel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    summary: '',
    summaryEn: '',
    content: '',
    contentEn: '',
    imageUrl: '',
    category: 'local' as CategoryType,
    author: '',
    readTime: 3,
    featured: false,
    trending: false,
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    setArticles(getAllArticles());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const articleData = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    if (editingArticle) {
      updateArticle(editingArticle.id, articleData);
    } else {
      createArticle(articleData);
    }

    resetForm();
    loadArticles();
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      titleEn: article.titleEn,
      summary: article.summary,
      summaryEn: article.summaryEn,
      content: article.content,
      contentEn: article.contentEn,
      imageUrl: article.imageUrl,
      category: article.category,
      author: article.author,
      readTime: article.readTime,
      featured: article.featured || false,
      trending: article.trending || false,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteArticle(id);
    loadArticles();
    setShowDeleteConfirm(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      titleEn: '',
      summary: '',
      summaryEn: '',
      content: '',
      contentEn: '',
      imageUrl: '',
      category: 'local',
      author: '',
      readTime: 3,
      featured: false,
      trending: false,
    });
    setEditingArticle(null);
    setIsEditing(false);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
                {t('అడ్మిన్ ప్యానెల్ - న్యూస్ నిర్వహణ', 'Admin Panel - News Management')}
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {t('ఒంగోలు కనెక్ట్ కోసం వార్తా కథనాలను నిర్వహించండి', 'Manage news articles for Ongole Connect')}
              </p>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 rounded-xl transition-colors"
              style={{ backgroundColor: 'var(--bg-sage)', color: 'var(--text-primary)' }}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              {t('సైట్ చూడండి', 'View Site')}
            </Link>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 rounded-xl text-white font-medium transition-all hover:shadow-lg flex items-center gap-2"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Plus className="w-5 h-5" />
              {t('కొత్త వార్త జోడించండి', 'Add New Article')}
            </button>
          )}
        </div>

        {/* Edit/Create Form */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 rounded-2xl"
              style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {editingArticle ? t('వార్త సవరించండి', 'Edit Article') : t('కొత్త వార్త', 'New Article')}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-full hover:bg-opacity-10"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Telugu Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('శీర్షిక (తెలుగు)', 'Title (Telugu)')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'rgba(243, 112, 33, 0.2)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder={t('తెలుగు శీర్షిక ఇక్కడ రాయండి', 'Enter Telugu title here')}
                    />
                  </div>

                  {/* English Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('శీర్షిక (ఆంగ్లం)', 'Title (English)')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'rgba(243, 112, 33, 0.2)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder={t('ఆంగ్ల శీర్షిక ఇక్కడ రాయండి', 'Enter English title here')}
                    />
                  </div>

                  {/* Telugu Summary */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('సారాంశం (తెలుగు)', 'Summary (Telugu)')} *
                    </label>
                    <textarea
                      required
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'rgba(243, 112, 33, 0.2)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder={t('తెలుగు సారాంశం', 'Telugu summary')}
                    />
                  </div>

                  {/* English Summary */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('సారాంశం (ఆంగ్లం)', 'Summary (English)')} *
                    </label>
                    <textarea
                      required
                      value={formData.summaryEn}
                      onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'rgba(243, 112, 33, 0.2)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder={t('ఆంగ్ల సారాంశం', 'English summary')}
                    />
                  </div>
                </div>

                {/* Telugu Content */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {t('పూర్తి వార్త (తెలుగు)', 'Full Content (Telugu)')} *
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                    style={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'rgba(243, 112, 33, 0.2)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder={t('పూర్తి వార్త తెలుగులో రాయండి', 'Write full content in Telugu')}
                  />
                </div>

                {/* English Content */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {t('పూర్తి వార్త (ఆంగ్లం)', 'Full Content (English)')} *
                  </label>
                  <textarea
                    required
                    value={formData.contentEn}
                    onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                    style={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'rgba(243, 112, 33, 0.2)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder={t('ఆంగ్లంలో పూర్తి వార్త రాయండి', 'Write full content in English')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('చిత్రం URL', 'Image URL')} *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'rgba(243, 112, 33, 0.2)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('వర్గం', 'Category')} *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryType })}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'rgba(243, 112, 33, 0.2)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {language === 'te' ? cat.name : cat.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('రచయిత', 'Author')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'rgba(243, 112, 33, 0.2)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder={t('రచయిత పేరు', 'Author name')}
                    />
                  </div>

                  {/* Read Time */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('చదవడానికి సమయం (నిమిషాలు)', 'Read Time (minutes)')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'rgba(243, 112, 33, 0.2)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="flex items-center gap-6 md:col-span-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-5 h-5 rounded"
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <span className="text-sm flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                        <Star className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                        Featured
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.trending}
                        onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                        className="w-5 h-5 rounded"
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <span className="text-sm flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                        <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                        Trending
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl text-white font-medium transition-all hover:shadow-lg flex items-center gap-2"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <Save className="w-5 h-5" />
                    {editingArticle ? t('నవీకరించండి', 'Update Article') : t('ప్రచురించండి', 'Publish Article')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-xl font-medium transition-all"
                    style={{ backgroundColor: 'var(--bg-sage)', color: 'var(--text-primary)' }}
                  >
                    {t('రద్దు చేయండి', 'Cancel')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Articles List */}
        {!isEditing && (
          <div>
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('వార్తలు వెతకండి...', 'Search articles...')}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-colors"
                  style={{ 
                    backgroundColor: 'var(--bg-parchment)', 
                    borderColor: 'rgba(243, 112, 33, 0.2)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl border-2 transition-colors appearance-none"
                  style={{ 
                    backgroundColor: 'var(--bg-parchment)', 
                    borderColor: 'rgba(243, 112, 33, 0.2)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="all">{t('అన్ని వర్గాలు', 'All Categories')}</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {language === 'te' ? cat.name : cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl transition-all hover:shadow-lg"
                  style={{ backgroundColor: 'var(--bg-parchment)', boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-48 h-32 object-cover rounded-xl"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                              {categories.find(c => c.id === article.category)?.icon} {language === 'te' ? categories.find(c => c.id === article.category)?.name : categories.find(c => c.id === article.category)?.nameEn}
                            </span>
                            {article.featured && (
                              <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: 'var(--accent-gold)', color: 'white' }}>
                                <Star className="w-3 h-3" /> {t('ఫీచర్డ్', 'Featured')}
                              </span>
                            )}
                            {article.trending && (
                              <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: 'var(--accent-green)', color: 'white' }}>
                                <TrendingUp className="w-3 h-3" /> {t('ట్రెండింగ్', 'Trending')}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold mb-1 line-clamp-1" style={{ color: 'var(--text-primary)', fontFamily: 'Gurajada, sans-serif' }}>
                            {language === 'te' ? article.title : article.titleEn}
                          </h3>
                          <p className="text-sm mb-2 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                            {language === 'te' ? article.summary : article.summaryEn}
                          </p>
                          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{new Date(article.timestamp).toLocaleDateString(language === 'te' ? 'te-IN' : 'en-US')}</span>
                            <span>•</span>
                            <span>{article.readTime} {t('నిమి', 'min')}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(article)}
                            className="p-2 rounded-lg transition-colors hover:bg-opacity-10"
                            style={{ color: 'var(--primary)' }}
                            title="Edit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(article.id)}
                            className="p-2 rounded-lg transition-colors hover:bg-opacity-10"
                            style={{ color: '#EF4444' }}
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  {t('వార్తలు కనుగొనబడలేదు', 'No articles found')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="p-6 rounded-2xl max-w-md w-full"
                style={{ backgroundColor: 'var(--bg-parchment)' }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {t('వార్త తొలగించాలా?', 'Delete Article?')}
                </h3>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {t('మీరు ఖచ్చితంగా ఈ వార్తను తొలగించాలనుకుంటున్నారా? ఈ చర్యను రద్దు చేయలేరు.', 'Are you sure you want to delete this article? This action cannot be undone.')}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDelete(showDeleteConfirm)}
                    className="flex-1 px-4 py-3 rounded-xl text-white font-medium transition-all"
                    style={{ backgroundColor: '#EF4444' }}
                  >
                    {t('తొలగించు', 'Delete')}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-3 rounded-xl font-medium transition-all"
                    style={{ backgroundColor: 'var(--bg-sage)', color: 'var(--text-primary)' }}
                  >
                    {t('రద్దు', 'Cancel')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
