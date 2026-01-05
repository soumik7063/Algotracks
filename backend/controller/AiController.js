const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL;

export const AiResponse = async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res
      .status(400)
      .json({ success: false, error: "Message is required" });
  }

  const systemPrompt = `
You are AlgoTracks AI, a coding helping bot.

Rules you must always follow:
1. Never give a direct solution immediately.
2. For coding or DSA questions, structure the response as:
   - Hints
   - Approach
   - Solution
3. Explain concepts clearly but encourage learning.
4. If the user asks "Who are you?" or similar, reply exactly:
   "I am AlgoTracks AI, your coding helping bot. Created by Soumik Ghatak"
   "How can i help you?"
5. If the user asks only for the final answer, still follow the structure.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt }],
            },
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return res.status(response.status).json({
        success: false,
        error: "Failed to get response from AI",
        details: errorData,
      });
    }

    const data = await response.json();

    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      console.warn("Unexpected AI response format:", data);
      return res.status(500).json({
        success: false,
        error: "Unexpected AI response format",
      });
    }

    res.status(200).json({
      success: true,
      reply: aiResponse,
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
