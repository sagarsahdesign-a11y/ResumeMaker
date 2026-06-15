import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const upload = multer({ dest: "/tmp/uploads/" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Set up GenAI
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  app.post("/api/tailor", upload.single("resume"), async (req, res) => {
    try {
      if (!ai) {
        throw new Error("GEMINI_API_KEY is not configured.");
      }
      
      const file = req.file;
      const { jobDescription, templateStr } = req.body;
      
      if (!file) {
        res.status(400).json({ error: "Resume file is required" });
        return;
      }
      
      // Upload file to Gemini using File API
      const geminiFile = await ai.files.upload({
        file: file.path,
        config: {
          mimeType: file.mimetype,
          displayName: file.originalname
        }
      });
      
      const prompt = `You are an expert Resume Writer and Career Coach. 
I have provided my current resume as a document. I am applying for the following job:
---
${jobDescription}
---
The chosen resume template format/style is: ${templateStr}.

Please generate a highly tailored, ATS-friendly resume based ONLY on my real experience from the uploaded resume.
- Do NOT invent experience, fake companies, or fabricate achievements.
- Extract skills, responsibilities, and keywords from the job description and emphasize matching points in the experience bullets.
- Write a fresh, tailored Professional Summary.
- Optimize experience bullets to include relevant keywords.
- Also compute an ATS Match Score based on how well my resume aligns with the job.

Return the response strictly as a JSON object with this shape:
{
  "atsScore": 85,
  "analysis": {
    "missingKeywords": ["keyword1", "keyword2"],
    "skillGaps": ["gap1", "gap2"],
    "atsFormattingIssues": ["issue1", "issue2"]
  },
  "tailoredResumeMarkdown": "The full resume text nicely formatted in Markdown, following the requested template style of ${templateStr}. DO NOT wrap the markdown in \`\`\`markdown tags inside the JSON. Just return the raw markdown string."
}
No other text outside the JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          { role: "user", parts: [
              { fileData: { fileUri: geminiFile.uri, mimeType: geminiFile.mimeType } },
              { text: prompt }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          temperature: 0.3
        }
      });
      
      const responseText = response.text;
      const parsed = JSON.parse(responseText || "{}");
      
      // Cleanup the uploaded file from Gemini to save storage
      try {
        await ai.files.delete({ name: geminiFile.name });
      } catch (e) {
        console.error("Failed to delete File from Gemini", e);
      }
      
      // Cleanup local disk
      if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
      }
      
      res.json(parsed);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: String(error) });
    }
  });

  app.post("/api/check-resume", upload.single("resume"), async (req, res) => {
    try {
      if (!ai) {
        throw new Error("GEMINI_API_KEY is not configured.");
      }
      
      const file = req.file;
      const { jobDescription } = req.body;
      
      if (!file) {
        res.status(400).json({ error: "Resume file is required" });
        return;
      }
      
      const geminiFile = await ai.files.upload({
        file: file.path,
        config: {
          mimeType: file.mimetype,
          displayName: file.originalname
        }
      });
      
      let prompt = `You are an expert ATS System and Technical Recruiter. Analyze this resume deeply.`;
      if (jobDescription && jobDescription.trim().length > 0) {
          prompt += ` Also, analyze how well this resume is tailored to the following Job Description:
---
${jobDescription}
---`;
      }
      
      prompt += `
Perform 19 crucial checks across 4 different categories on this resume.
1. CONTENT: Review 'ATS Parse Rate', 'Quantifying Impact', 'Repetition', 'Spelling & Grammar', 'Bullets Consistency'.
2. SECTIONS: Review 'Contact Information', 'Essential Sections', 'Personality showcase'.
3. ATS ESSENTIALS: Review 'File Format', 'Resume length', 'Long bullet points'.
4. TAILORING: Review keyword matches based on the job description (if provided), hard skills, and soft skills.

Return the response strictly as a JSON object with this shape:
{
  "totalScore": number (0-100),
  "categories": [
     {
       "id": string (e.g., "CONTENT"),
       "title": string,
       "score": number (0-100),
       "checks": [
          {
            "name": string (e.g., "Quantifying Impact"),
            "status": string ("success", "issue", "warning"),
            "message": string (Detailed explanation / what to fix)
          }
       ]
     }
  ],
  "summary": string (A short positive message)
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          { role: "user", parts: [
              { fileData: { fileUri: geminiFile.uri, mimeType: geminiFile.mimeType } },
              { text: prompt }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const responseText = response.text;
      const parsed = JSON.parse(responseText || "{}");
      
      try {
        await ai.files.delete({ name: geminiFile.name });
      } catch (e) {
        console.error("Failed to delete File from Gemini", e);
      }
      
      if (fs.existsSync(file.path)) {
         fs.unlinkSync(file.path);
      }
      
      res.json(parsed);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
