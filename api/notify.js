export default async function handler(req, res) {
    // Tanggapin lang ang POST request
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { ip, action } = req.body;
    
    // Hardcoded Telegram Credentials
    const botToken = '9204304222:AAFONF4kGKsuipL_yq3Bm1gbAk0V2AaQpUE';
    const chatId = '8602403928';

    if (action === 'visited') {
        try {
            // Generate Random Email
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let emailStr = '';
            for (let i = 0; i < 8; i++) emailStr += chars.charAt(Math.floor(Math.random() * chars.length));
            const randomEmail = `${emailStr}@gmail.com`;

            // Generate Random Password
            const passChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#';
            let randomPass = '';
            for (let i = 0; i < 12; i++) randomPass += passChars.charAt(Math.floor(Math.random() * passChars.length));

            // I-format ang message para sa Telegram
            const text = `🌐 *New Visitor!*\n\n*IP Address:* \`${ip}\`\n*Time:* ${new Date().toLocaleString()}\n\n🔐 *Generated Creds:*\n*Email:* \`${randomEmail}\`\n*Pass:* \`${randomPass}\``;
            
            // Send sa Telegram
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    chat_id: chatId, 
                    text: text, 
                    parse_mode: 'Markdown' 
                })
            });

            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send notification' });
        }
    }
    return res.status(400).json({ error: 'Invalid action' });
}
