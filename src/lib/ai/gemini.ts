import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface AIProcessingResult {
  teluguTitle: string;
  englishTitle: string;
  teluguSummary: string;
  englishSummary: string;
  teluguContent: string;
  englishContent: string;
  category: string;
  tags: string[];
  priority: 'normal' | 'breaking';
}

/**
 * Process article content with AI
 * - Translate to Telugu
 * - Generate summaries
 * - Categorize
 * - Extract tags
 */
export async function processArticleWithAI(
  title: string,
  content: string,
  sourceLanguage: 'english' | 'telugu' = 'english'
): Promise<AIProcessingResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are an AI assistant for OngoleConnect, a local news platform for Ongole and Prakasam District in Andhra Pradesh, India.

Task: Process the following news article and provide structured output.

Original Title: ${title}
Original Content: ${content}
Source Language: ${sourceLanguage}

Please provide the following in JSON format:

1. **teluguTitle**: Translate the title to Telugu (if English) or optimize it (if Telugu). Keep it engaging and under 100 characters.

2. **englishTitle**: Translate the title to English (if Telugu) or optimize it (if English). Keep it engaging and under 100 characters.

3. **teluguSummary**: Create a concise Telugu summary (2-3 sentences, ~150 characters) that captures the essence of the article.

4. **englishSummary**: Create a concise English summary (2-3 sentences, ~150 characters) that captures the essence of the article.

5. **teluguContent**: Full article content in Telugu. If source is English, translate it. If source is Telugu, clean and format it properly. Maintain all important details. Use proper Telugu grammar and natural language.

6. **englishContent**: Full article content in English. If source is Telugu, translate it. If source is English, clean and format it properly. Maintain all important details.

7. **category**: Categorize the article into ONE of these categories:
   - local (Ongole/Prakasam district news)
   - state (Andhra Pradesh state news)
   - national (India-wide news)
   - spiritual (religious, temples, festivals)
   - business (local businesses, economy)
   - sports (cricket, local sports)
   - movies (Telugu cinema, entertainment)
   - agriculture (farming, crops, weather)

8. **tags**: Extract 3-5 relevant tags in English (lowercase, single words or short phrases)

9. **priority**: Determine if this is "breaking" news or "normal" news

Important Guidelines:
- Keep Telugu natural and readable
- Maintain factual accuracy
- Use proper Telugu script (తెలుగు)
- For local news, emphasize Ongole/Prakasam district context
- Keep summaries concise but informative

Return ONLY valid JSON, no additional text:
{
  "teluguTitle": "...",
  "englishTitle": "...",
  "teluguSummary": "...",
  "englishSummary": "...",
  "teluguContent": "...",
  "englishContent": "...",
  "category": "...",
  "tags": ["...", "..."],
  "priority": "normal" or "breaking"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (!parsed.teluguTitle || !parsed.englishTitle || !parsed.category) {
      throw new Error('AI response missing required fields');
    }

    return {
      teluguTitle: parsed.teluguTitle,
      englishTitle: parsed.englishTitle,
      teluguSummary: parsed.teluguSummary || parsed.teluguTitle,
      englishSummary: parsed.englishSummary || parsed.englishTitle,
      teluguContent: parsed.teluguContent || content,
      englishContent: parsed.englishContent || content,
      category: parsed.category,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      priority: parsed.priority === 'breaking' ? 'breaking' : 'normal'
    };
  } catch (error) {
    console.error('AI Processing Error:', error);
    
    // Fallback: return original content with basic processing
    return {
      teluguTitle: title,
      englishTitle: title,
      teluguSummary: content.substring(0, 150) + '...',
      englishSummary: content.substring(0, 150) + '...',
      teluguContent: content,
      englishContent: content,
      category: 'local',
      tags: [],
      priority: 'normal'
    };
  }
}

/**
 * Generate social media caption
 */
export async function generateSocialCaption(
  title: string,
  summary: string,
  language: 'telugu' | 'english' = 'telugu'
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Create an engaging social media caption for ${language === 'telugu' ? 'Telugu' : 'English'} audience.

Title: ${title}
Summary: ${summary}

Requirements:
- Keep it under 200 characters
- Make it engaging and clickable
- ${language === 'telugu' ? 'Write in Telugu script' : 'Write in English'}
- Add 2-3 relevant hashtags at the end
- Use emojis appropriately (1-2 max)

Return only the caption text, nothing else.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Social Caption Generation Error:', error);
    // Fallback
    return `${title}\n\n${summary}\n\n#OngoleConnect #PrakasamDistrict #TeluguNews`;
  }
}

/**
 * Detect if content is breaking news
 */
export async function detectBreakingNews(title: string, content: string): Promise<boolean> {
  const breakingKeywords = [
    'breaking', 'urgent', 'alert', 'emergency', 'accident', 'death', 'fire',
    'బ్రేకింగ్', 'అత్యవసరం', 'హెచ్చరిక', 'ప్రమాదం'
  ];

  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  return breakingKeywords.some(keyword => 
    lowerTitle.includes(keyword) || lowerContent.includes(keyword)
  );
}

/**
 * Calculate read time based on content length
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, Math.min(minutes, 30)); // Between 1-30 minutes
}
