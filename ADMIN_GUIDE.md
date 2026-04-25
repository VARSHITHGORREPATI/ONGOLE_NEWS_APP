# Admin Panel User Guide

## 🎯 Quick Start

Access the admin panel at: **http://localhost:3000/admin**

## 📝 Creating a New Article

### Step 1: Click "Add New Article"
Look for the orange button that says "కొత్త వార్త జోడించండి (Add New Article)"

### Step 2: Fill in the Form

#### Required Fields (marked with *)

**1. Telugu Title (శీర్షిక)**
```
Example: ఒంగోలులో కొత్త పార్క్ ప్రారంభం
```

**2. English Title**
```
Example: New Park Inaugurated in Ongole
```

**3. Telugu Summary (సారాంశం)**
```
Example: ఒంగోలు నగరంలో కొత్త పార్క్ ప్రారంభించబడింది. ఈ పార్క్‌లో ఆధునిక సౌకర్యాలు ఉన్నాయి.
```

**4. English Summary**
```
Example: A new park has been inaugurated in Ongole city. This park has modern facilities.
```

**5. Telugu Content (పూర్తి వార్త)**
```
Example: ఒంగోలు నగరంలో నిన్న కొత్త పార్క్ ప్రారంభించబడింది. ఈ పార్క్‌లో పిల్లల ఆట స్థలం, వ్యాయామ సౌకర్యాలు, నడక మార్గాలు ఉన్నాయి. మేయర్ ఈ పార్క్‌ను ప్రారంభించారు. ప్రజలు ఈ పార్క్‌ను చాలా ఇష్టపడుతున్నారు.
```

**6. English Content**
```
Example: A new park was inaugurated yesterday in Ongole city. This park has a children's play area, exercise facilities, and walking paths. The mayor inaugurated this park. People are really enjoying this park.
```

**7. Image URL**
```
Example: https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80
```
*Tip: Use Unsplash, Pexels, or any image hosting service*

**8. Category (వర్గం)**
Select from dropdown:
- 🏠 స్థానిక (Local)
- 🏛️ రాష్ట్రం (State)
- 🇮🇳 జాతీయం (National)
- 🙏 ఆధ్యాత్మికం (Spiritual)
- 💼 వ్యాపారం (Business)
- 🏏 క్రీడలు (Sports)
- 🎬 సినిమాలు (Movies)
- 🌾 వ్యవసాయం (Agriculture)

**9. Author (రచయిత)**
```
Example: రామేశ్వరం ప్రసాద్
```

**10. Read Time**
```
Example: 3 (minutes)
```

#### Optional Fields

**11. Featured** ⭐
- Check this box to show article in hero slider
- Featured articles appear prominently on homepage

**12. Trending** 📈
- Check this box to show in trending section
- Trending articles get special badge

### Step 3: Publish
Click "Publish Article - ప్రచురించండి" button

## ✏️ Editing an Article

1. Find the article in the list
2. Click the **Edit** button (✏️ icon)
3. Form will open with existing data
4. Make your changes
5. Click "Update Article - నవీకరించండి"

## 🗑️ Deleting an Article

1. Find the article in the list
2. Click the **Delete** button (🗑️ icon)
3. Confirm deletion in the popup
4. Article will be removed immediately

## 🔍 Search & Filter

### Search
- Type in the search box to find articles by title
- Works for both Telugu and English titles
- Real-time filtering

### Filter by Category
- Use the dropdown to filter by category
- Select "All Categories" to see everything

## 💡 Tips & Best Practices

### Writing Good Content

1. **Titles**: Keep them concise and attention-grabbing
   - Telugu: 50-70 characters
   - English: 50-70 characters

2. **Summaries**: Brief overview of the article
   - Telugu: 100-150 characters
   - English: 100-150 characters

3. **Content**: Full article with details
   - Telugu: 200-500 words
   - English: 200-500 words

### Image Guidelines

1. **Size**: Recommended 1200x675px (16:9 ratio)
2. **Format**: JPG or PNG
3. **Quality**: High resolution but optimized
4. **Sources**: 
   - Unsplash: https://unsplash.com
   - Pexels: https://pexels.com
   - Pixabay: https://pixabay.com

### Category Selection

- **Local**: Ongole and nearby areas news
- **State**: Andhra Pradesh state news
- **National**: India-wide news
- **Spiritual**: Religious, temples, festivals
- **Business**: Local businesses, economy
- **Sports**: Cricket, local sports events
- **Movies**: Telugu cinema, entertainment
- **Agriculture**: Farming, crops, weather

### Featured vs Trending

**Featured** ⭐
- Use for: Important breaking news
- Appears in: Hero slider on homepage
- Limit: 3-5 articles at a time

**Trending** 📈
- Use for: Popular or viral content
- Appears in: Trending sidebar
- Limit: 5-10 articles at a time

## 🎨 Content Examples

### Local News Example
```
Telugu Title: ఒంగోలు బస్ స్టాండ్ వద్ద కొత్త షాపింగ్ కాంప్లెక్స్
English Title: New Shopping Complex at Ongole Bus Stand

Category: Local (స్థానిక)
Author: వ్యాపార విలాసం
Read Time: 3 minutes
Featured: Yes
Trending: No
```

### Spiritual News Example
```
Telugu Title: శ్రీశైలం మల్లికార్జునుని ఆలయంలో బ్రహ్మోత్సవాలు
English Title: Brahmotsavams at Srisailam Temple

Category: Spiritual (ఆధ్యాత్మికం)
Author: భక్తి ప్రసాద్
Read Time: 4 minutes
Featured: Yes
Trending: Yes
```

### Sports News Example
```
Telugu Title: IPL 2026: హైదరాబాద్ విజయం
English Title: IPL 2026: Hyderabad Victory

Category: Sports (క్రీడలు)
Author: క్రీడా ప్రతినిధి
Read Time: 2 minutes
Featured: No
Trending: Yes
```

## ⚠️ Important Notes

1. **All fields are required** except Featured and Trending checkboxes
2. **Both languages must be filled** - Telugu and English
3. **Image URLs must be valid** - Test the URL before submitting
4. **Changes are immediate** - No undo button (yet)
5. **Data is temporary** - Currently stored in memory, resets on server restart

## 🐛 Troubleshooting

### Article not appearing?
- Check if all required fields are filled
- Verify image URL is valid
- Refresh the page

### Can't edit article?
- Make sure you clicked the correct edit button
- Check if form is already open

### Delete not working?
- Confirm the deletion in the popup
- Check browser console for errors

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console (F12)
2. Verify all fields are filled correctly
3. Try refreshing the page
4. Contact the development team

---

**Happy Publishing! 📰**

Remember: Great content in both Telugu and English helps reach more readers in Prakasam District! 🐂
