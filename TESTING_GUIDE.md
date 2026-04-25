# Testing Guide - Ongole Connect

## 🚀 Quick Start

**Server is running at:** http://localhost:3000

## 🧪 Test Scenarios

### 1. Language Toggle Test (Most Important!)

**Steps:**
1. Open http://localhost:3000
2. Look at the navbar - you'll see navigation in Telugu
3. Click the **Languages icon (🌐)** in the navbar (next to theme toggle)
4. **Watch everything change to English!**
   - Navigation: హోమ్ → Home
   - Categories: స్థానిక → Local
   - Article titles change
   - Article summaries change
   - Time stamps change
5. Click the language icon again
6. **Everything switches back to Telugu!**

**What to verify:**
- ✅ Navbar links change language
- ✅ Article titles change
- ✅ Article summaries change
- ✅ Category names change
- ✅ Time stamps change ("5 min ago" ↔ "5 నిమిషాల క్రితం")
- ✅ Refresh page - language preference persists

---

### 2. Navigation Test

**Test Category Pages:**
1. Click **"స్థానిక" (Local)** in navbar
   - Should load: http://localhost:3000/category/local
   - Should show local news articles
   - Toggle language - page title should change

2. Click **"రాష్ట్రం" (State)** in navbar
   - Should load: http://localhost:3000/category/state
   - Should show state news articles

3. Click **"జాతీయం" (National)** in navbar
   - Should load: http://localhost:3000/category/national
   - Should show national news articles

**Test Article Pages:**
1. Click any article card on home page
   - Should load article detail page
   - Should show full article content
   - Toggle language - content should change
   - Click "Back to Home" - should return to home

---

### 3. Admin Panel Test

**Access Admin:**
1. Go to http://localhost:3000/admin
2. Or click "అడ్మిన్ ప్యానెల్" in footer

**Create Article:**
1. Click "కొత్త వార్త జోడించండి (Add New Article)"
2. Fill in all fields:
   ```
   Telugu Title: టెస్ట్ వార్త
   English Title: Test Article
   Telugu Summary: ఇది ఒక టెస్ట్ వార్త
   English Summary: This is a test article
   Telugu Content: పూర్తి వార్త తెలుగులో
   English Content: Full article in English
   Image URL: https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800
   Category: Local (స్థానిక)
   Author: Test Author
   Read Time: 2
   ```
3. Click "Publish Article"
4. Article should appear in the list

**Edit Article:**
1. Find your test article
2. Click the **Edit (✏️)** button
3. Change the title
4. Click "Update Article"
5. Changes should be saved

**Delete Article:**
1. Find your test article
2. Click the **Delete (🗑️)** button
3. Confirm deletion
4. Article should be removed

**Search & Filter:**
1. Type in search box - articles filter in real-time
2. Select category from dropdown - shows only that category

---

### 4. Complete User Journey

**Scenario: Telugu User Reading News**

1. **Land on homepage** (http://localhost:3000)
   - See Telugu interface
   - See latest articles in Telugu

2. **Browse categories**
   - Click "క్రీడలు" (Sports) in category tabs
   - See sports articles

3. **Read an article**
   - Click on an article card
   - Read full article in Telugu
   - See related articles at bottom

4. **Switch to English**
   - Click language toggle (🌐)
   - Everything changes to English
   - Article content now in English

5. **Share article**
   - Click share buttons
   - Copy link works
   - Social media buttons work

---

### 5. Mobile Responsive Test

**Test on mobile view:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone, Android)
4. Test:
   - ✅ Bottom navigation appears
   - ✅ Hamburger menu works
   - ✅ Language toggle works
   - ✅ Articles display correctly
   - ✅ Admin panel is usable

---

## 🎯 Key Features to Verify

### Language Features:
- [ ] Language toggle button visible in navbar
- [ ] Clicking toggle switches all text
- [ ] Article titles change
- [ ] Article content changes
- [ ] Category names change
- [ ] UI labels change
- [ ] Time stamps change format
- [ ] Dates change format
- [ ] Language preference persists after refresh

### Navigation Features:
- [ ] All navbar links work
- [ ] Category pages load
- [ ] Article pages load
- [ ] Back buttons work
- [ ] Footer links work
- [ ] Mobile navigation works

### Admin Features:
- [ ] Can access admin panel
- [ ] Can create articles
- [ ] Can edit articles
- [ ] Can delete articles
- [ ] Search works
- [ ] Filter works
- [ ] Form validation works

### Content Features:
- [ ] Articles display correctly
- [ ] Images load
- [ ] Categories show correct articles
- [ ] Related articles appear
- [ ] Trending articles marked
- [ ] Featured articles in slider

---

## 🐛 Common Issues & Solutions

### Issue: Language not changing
**Solution:** 
- Clear browser cache
- Check if language icon is visible
- Try in incognito mode

### Issue: Category page not loading
**Solution:**
- Server should be running
- Check URL is correct
- Refresh the page

### Issue: Admin panel not accessible
**Solution:**
- Go directly to http://localhost:3000/admin
- Check server is running
- Clear browser cache

### Issue: Images not loading
**Solution:**
- Check internet connection
- Image URLs must be valid
- Try different image URL

---

## ✅ Success Criteria

**The website is working correctly if:**

1. ✅ Home page loads without errors
2. ✅ Language toggle changes all text
3. ✅ All navigation links work
4. ✅ Category pages show articles
5. ✅ Article pages show full content
6. ✅ Admin panel allows CRUD operations
7. ✅ No console errors (F12 → Console)
8. ✅ Mobile view works properly
9. ✅ Images load correctly
10. ✅ Language preference persists

---

## 📊 Browser Console Check

**Open Console (F12) and verify:**
- ✅ No red errors
- ✅ No warnings about missing components
- ✅ No 404 errors
- ✅ No failed network requests

**Expected console output:**
```
▲ Next.js 14.2.35
✓ Ready in 1860ms
```

---

## 🎉 All Tests Passing?

**Congratulations!** Your Ongole Connect website is fully functional with:
- ✅ Complete bilingual support (Telugu/English)
- ✅ Working navigation
- ✅ Functional admin panel
- ✅ Beautiful Ongole Bull branding
- ✅ Mobile responsive design

**Ready to use!** 🚀

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console (F12)
2. Verify server is running (http://localhost:3000)
3. Try clearing browser cache
4. Restart the development server
5. Check FIXES_APPLIED.md for details

**Happy Testing!** 🎊
