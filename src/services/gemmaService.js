import CHEMISTRY_LESSONS from '../data/chemistryLessons';

const GEMMA_API_KEY = import.meta.env.VITE_GEMMA_API_KEY;
const GEMMA_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-4-26b-a4b-it:generateContent';

const USE_LOCAL_OLLAMA = import.meta.env.VITE_USE_LOCAL_OLLAMA === 'true';
const OLLAMA_API_URL = import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'gemma4:e2b';

// Helper to search chapter in CHEMISTRY_LESSONS
const findChapter = (lessonTitle) => {
  const allChapters = Object.values(CHEMISTRY_LESSONS).flat();
  return allChapters.find(c => c.title.toLowerCase() === lessonTitle.toLowerCase());
};

// Helper to filter out stop words and find clean query words
const cleanWords = (text) => {
  const stopwords = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't", 'as', 'at',
    'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', "can't", 'cannot',
    'could', "couldn't", 'did', "did't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during', 'each',
    'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd",
    "he'll", "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'i',
    "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's",
    'me', 'more', 'most', "mustn't", 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
    'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll",
    "she's", 'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs',
    'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've",
    'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll",
    "we're", "we've", 'were', "weren't", 'what', "what's", 'when', "when's", 'where', "where's", 'which', 'while',
    'who', "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't", 'you', "you'd", "you'll",
    "you're", "you've", 'your', 'yours', 'yourself', 'yourselves', 'explain', 'tell', 'define', 'give', 'show', 'please'
  ]);
  
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w && !stopwords.has(w));
};

// Helper for Mock AI responses
const generateMockAnswer = (question, lessonTitle, lessonOverview) => {
  const q = question.toLowerCase().trim();
  const chapter = findChapter(lessonTitle);
  const keyPoints = chapter?.content?.keyPoints || [];
  const sections = chapter?.content?.sections || [];
  const examples = chapter?.content?.examples || [];
  const quickFacts = chapter?.content?.quickFacts || [];
  const summary = chapter?.content?.summary || "";

  // Check for greetings or system queries
  if (q.includes('hello') || q.includes('hi ') || q.includes('hey') || q === 'hi' || q === 'hello') {
    return `Hello! I am Chemi, your AI Chemistry Tutor for NX Chemistree. 🧪\n\nI am currently assisting you with "${lessonTitle}". We can discuss sections like:\n${sections.map(s => `- **${s.title}**`).join('\n')}\n\nHow can I help you understand this chapter today?`;
  }

  // 1. Off-topic filter
  const chemKeywords = [
    'chem', 'acid', 'base', 'salt', 'reaction', 'atom', 'molecule', 'bond', 'periodic', 'table',
    'element', 'metal', 'organic', 'inorganic', 'physical', 'formula', 'mass', 'mole', 'quantum',
    'electron', 'proton', 'neutron', 'orbit', 'hydrogen', 'gas', 'thermodynamic', 'entropy', 'enthalpy',
    'equilibrium', 'solution', 'solute', 'solvent', 'corrosion', 'electrochemistry', 'ph', 'litmus',
    'water', 'copper', 'zinc', 'carbon', 'catenation', 'valency', 'radius', 'what is', 'explain', 
    'how', 'why', 'define', 'example', 'fact', 'summary', 'overview', 'formula', 'tell me', 'dmitri',
    'mendeleev', 'dobereiner', 'newland', 'law', 'octave', 'triad'
  ];
  
  const isRelated = chemKeywords.some(keyword => q.includes(keyword));
  if (!isRelated && q.length > 8) {
    return "I can only help with chemistry-related topics! 🧪 Please ask a question related to this chemistry lesson.";
  }

  // 2. Dynamic specific answers for general requests:
  // 2a. Formulas / Equations
  if (q.includes('formula') || q.includes('equation') || q.includes('reaction')) {
    const sectionsWithFormulas = sections.filter(s => s.formula);
    if (sectionsWithFormulas.length > 0) {
      let resp = `### **Chemical Formulas in ${lessonTitle}** 📝\n\nHere are the key formulas and reactions for this chapter:\n\n`;
      sectionsWithFormulas.forEach(s => {
        resp += `* **${s.title}**:\n  \`${s.formula}\`\n`;
      });
      return resp;
    }
  }

  // 2b. Examples
  if (q.includes('example') || q.includes('application') || q.includes('real world')) {
    if (examples.length > 0) {
      let resp = `### **Real-World Applications of ${lessonTitle}** 💡\n\nHere is how these concepts apply to daily life:\n\n`;
      examples.forEach((ex, idx) => {
        resp += `${idx + 1}. **${ex.title}**\n   ${ex.description}\n\n`;
      });
      return resp;
    }
  }

  // 2c. Facts
  if (q.includes('fact') || q.includes('trivia') || q.includes('interesting')) {
    if (quickFacts.length > 0) {
      let resp = `### **Quick Facts & Trivia about ${lessonTitle}** ⚡\n\n`;
      quickFacts.forEach(fact => {
        resp += `⚡ *${fact}*\n\n`;
      });
      return resp;
    }
  }

  // 2d. Summary / Overview
  if (q.includes('summary') || q.includes('summarize') || q.includes('overview')) {
    return `### **Lesson Summary: ${lessonTitle}** 📋\n\n**Overview:**\n*"${lessonOverview}"*\n\n**Key Takeaway:**\n*"${summary}"*\n\nFeel free to ask about any specific topic or trend in this chapter!`;
  }

  // 3. Word overlap scoring algorithm
  const queryWords = cleanWords(q);
  
  if (queryWords.length > 0) {
    let bestMatch = null;
    let highestScore = 0;
    
    // Check sections
    sections.forEach(sec => {
      let score = 0;
      const titleWords = cleanWords(sec.title);
      const bodyWords = cleanWords(sec.body + " " + (sec.formula || "") + " " + (sec.note || ""));
      
      queryWords.forEach(qw => {
        if (titleWords.includes(qw)) score += 3;
        if (bodyWords.includes(qw)) score += 1;
      });
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          type: 'section',
          data: sec
        };
      }
    });
    
    // Check keyPoints
    keyPoints.forEach(pt => {
      let score = 0;
      const parts = pt.split(':');
      const topicWords = cleanWords(parts[0] || "");
      const descWords = cleanWords(parts[1] || pt);
      
      queryWords.forEach(qw => {
        if (topicWords.includes(qw)) score += 3;
        if (descWords.includes(qw)) score += 1;
      });
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          type: 'keypoint',
          data: pt
        };
      }
    });

    // Check examples
    examples.forEach(ex => {
      let score = 0;
      const titleWords = cleanWords(ex.title);
      const descWords = cleanWords(ex.description);
      
      queryWords.forEach(qw => {
        if (titleWords.includes(qw)) score += 3;
        if (descWords.includes(qw)) score += 1;
      });
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          type: 'example',
          data: ex
        };
      }
    });

    // If we have a reasonable match score (>= 1), return the specific content!
    if (bestMatch && highestScore >= 1) {
      if (bestMatch.type === 'section') {
        const sec = bestMatch.data;
        let resp = `### **${sec.title}** 🧪\n\n${sec.body}\n\n`;
        if (sec.formula) {
          resp += `**Chemical Formula / Relation:**\n\`${sec.formula}\`\n\n`;
        }
        if (sec.note) {
          resp += `💡 *Quick Tip:* ${sec.note}\n`;
        }
        return resp;
      }
      
      if (bestMatch.type === 'keypoint') {
        const pt = bestMatch.data;
        const parts = pt.split(':');
        return `### **Let's discuss ${parts[0]?.trim()}** 🌟\n\n${parts[1]?.trim() || pt}\n\nThis is one of the essential rules/trends for this lesson!`;
      }
      
      if (bestMatch.type === 'example') {
        const ex = bestMatch.data;
        return `### **Real-World Application: ${ex.title}** 💡\n\n${ex.description}\n\nThis represents a direct application of ${lessonTitle} in chemistry!`;
      }
    }
  }

  // 4. Default Dynamic fallbacks (progressive responses to avoid identical repeating)
  const fallbackMessages = [
    `### **Tutor Insights: ${lessonTitle}** 📘\n\n${lessonOverview}\n\nHere are some specific questions you can ask me:\n${sections.slice(0, 2).map(s => `- *"Tell me about ${s.title}"*`).join('\n')}\n- *"What is a real-world example?"*`,
    
    `### **Exploring "${lessonTitle}"** 🧪\n\nWe cover many interesting concepts in this chapter. Specifically, **${keyPoints[0]?.split(':')[0] || 'the main trend'}** states: *"${keyPoints[0]?.split(':')[1] || keyPoints[0]}"*\n\nWould you like me to explain this in more detail?`,
    
    `### **Chemistry Tips** 💡\n\nDid you know this about **${lessonTitle}**?\n⚡ *${quickFacts[0] || 'There are many exciting aspects in this lesson!'}*\n\nAsk me about formulas, real-world examples, or facts to learn more!`
  ];

  // Pick a fallback based on length of chat query or random seed
  const index = Math.abs(q.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % fallbackMessages.length;
  return fallbackMessages[index];
};

// Helper for Mock Quiz responses
const generateMockQuiz = (lessonTitle, keyPoints) => {
  const questions = [];
  const selectedPoints = keyPoints.slice(0, 3);
  
  selectedPoints.forEach((point, idx) => {
    const parts = point.split(':');
    const topic = parts[0]?.trim() || "Concept";
    const desc = parts[1]?.trim() || point;
    
    questions.push({
      question: `Which of the following statements is correct regarding "${topic}" under the "${lessonTitle}" module?`,
      options: [
        `A) ${desc}`,
        `B) It represents an unstable compound state that instantly decomposes in standard conditions.`,
        `C) It is a purely theoretical hypothesis with no real-world biological applications.`,
        `D) It violates the Law of Conservation of Mass and is therefore disregarded.`
      ],
      correct: "A",
      explanation: `Correct! ${topic} is defined as: ${desc}`
    });
  });

  // Fallback if keyPoints is empty
  if (questions.length === 0) {
    questions.push({
      question: `What is the primary scientific focus of "${lessonTitle}"?`,
      options: [
        `A) Understanding the underlying chemical and physical interactions.`,
        `B) Calculating astronomical distances between active star clusters.`,
        `C) Cataloging ancient geological formations from the Jurassic period.`,
        `D) Analyzing macroeconomic cycles in international trade routes.`
      ],
      correct: "A",
      explanation: `Correct! ${lessonTitle} is centered around studying chemical principles, compounds, and structural transformations.`
    });
  }

  return { questions };
};

export const askGemma = async (question, lessonTitle, lessonOverview) => {
  const systemPrompt = `You are an expert chemistry tutor for NX Chemistree,
an educational app for Indian students.
Current lesson: ${lessonTitle}
Lesson context: ${lessonOverview}
RULES:
- Answer ONLY chemistry related questions
- Keep answers clear, simple and student-friendly
- Use Indian curriculum examples where relevant
- Format answers with proper line breaks
- For formulas use plain text (H2O, CO2 etc)
- If off-topic reply: "I can only help with chemistry topics! 🧪"
- Maximum answer length: 300 words`;

  if (USE_LOCAL_OLLAMA) {
    try {
      const response = await fetch(OLLAMA_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: `${systemPrompt}\n\nStudent question: ${question}`,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Local Ollama server returned an error');
      }

      const data = await response.json();
      return { success: true, answer: data.response.trim() };
    } catch (error) {
      console.warn('Ollama offline fetch failed, falling back to simulated tutor:', error);
      return {
        success: true,
        answer: generateMockAnswer(question, lessonTitle, lessonOverview)
      };
    }
  }

  if (!GEMMA_API_KEY || GEMMA_API_KEY === 'your_api_key_here') {
    // Return high quality simulated answer instantly with small delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      answer: generateMockAnswer(question, lessonTitle, lessonOverview)
    };
  }

  const requestBody = {
    contents: [{
      parts: [{ text: systemPrompt + "\n\nStudent question: " + question }]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
      topP: 0.8
    }
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(
      `${GEMMA_API_URL}?key=${GEMMA_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      }
    );
    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) throw new Error('Empty response from API');
    return { success: true, answer: answer.trim() };

  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      return {
        success: false,
        answer: "Request timed out. Please check your connection. ⏱️"
      };
    }
    if (!navigator.onLine) {
      return {
        success: false,
        answer: "You are offline. Static lessons available but AI chat needs internet. 📶"
      };
    }
    return {
      success: false,
      answer: `Connection error: ${error.message}. Please try again. 🔄`
    };
  }
};

export const generateQuiz = async (lessonTitle, keyPoints) => {
  const prompt = `Generate exactly 3 multiple choice questions about
"${lessonTitle}" based on these key points: ${keyPoints.join(', ')}.
Respond in this EXACT JSON format only, no extra text:
{
  "questions": [
    {
      "question": "question text",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "correct": "A",
      "explanation": "brief explanation"
    }
  ]
}`;

  if (USE_LOCAL_OLLAMA) {
    try {
      const response = await fetch(OLLAMA_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.3
          }
        })
      });
      if (!response.ok) throw new Error('Local Ollama returned error for quiz generation');
      const data = await response.json();
      const text = data.response || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const quiz = JSON.parse(clean);
      return { success: true, quiz };
    } catch (error) {
      console.warn('Ollama offline quiz generation failed, falling back to simulated quiz:', error);
      return {
        success: true,
        quiz: generateMockQuiz(lessonTitle, keyPoints)
      };
    }
  }

  if (!GEMMA_API_KEY || GEMMA_API_KEY === 'your_api_key_here') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      quiz: generateMockQuiz(lessonTitle, keyPoints)
    };
  }

  try {
    const response = await fetch(
      `${GEMMA_API_URL}?key=${GEMMA_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 800 }
        })
      }
    );
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const quiz = JSON.parse(clean);
    return { success: true, quiz };
  } catch {
    return { success: false, quiz: null };
  }
};
