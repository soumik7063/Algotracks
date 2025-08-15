// AIzaSyBozGNKbHN11l2axuWFznZg7ueQiauw2_o

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBozGNKbHN11l2axuWFznZg7ueQiauw2_o"
export const AiResponse = async (req,res)=>{
    const userMessage = req.body.message
    if (!userMessage) {
    return res.status(400).json({ success:false,error: 'Message is required' });
  }
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
      }),
    });
     if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return res.status(response.status).json({ error: 'Failed to get response from AI', details: errorData });
    }
    const data = await response.json();
    const aiResponse = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
    if (!aiResponse) {
      console.warn('AI response format unexpected:', data);
      return res.status(500).json({ error: 'Unexpected AI response format' });
    }
    res.status(200).json({success:true, reply: aiResponse });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
