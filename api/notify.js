export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { ip, action, message } = req.body;
    
    // HARDCODED CREDENTIALS
    const botToken = '9204304222:AAFONF4kGKsuipL_yq3Bm1gbAk0V2AaQpUE';
    const chatId = '8602403928';

    let text = '';
    if (action === 'visited') {
        text = `🌐 *New Visitor!*\n\n*IP:* \`${ip}\`\n*Time:* ${new Date().toLocaleString()}`;
    } else if (action === 'chat') {
        text = `💬 *New Message!*\n\n*IP:* \`${ip}\`\n*Message:* ${message}`;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send Telegram message' });
    }
}
