export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { ip, message } = req.body;
    
    // Hardcoded Telegram Credentials
    const botToken = '9204304222:AAFONF4kGKsuipL_yq3Bm1gbAk0V2AaQpUE';
    const chatId = '8602403928';

    try {
        // 1. I-fetch ang response sa ceddsrestapi (Bypass CORS)
        const apiRes = await fetch(`https://ceddsrestapi.vercel.app/ai/chipp?message=${encodeURIComponent(message)}`);
        const data = await apiRes.json();

        // 2. I-send ang chat logs sa Telegram
        const tgText = `💬 *New Chat Received!*\n\n*IP:* \`${ip}\`\n*Message:* ${message}`;
        
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, 
                text: tgText, 
                parse_mode: 'Markdown' 
            })
        });

        // 3. Ibalik ang AI response sa frontend
        return res.status(200).json({ response: data.response });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch AI response' });
    }
}
