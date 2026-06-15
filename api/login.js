// Vercel Serverless Function - সম্পূর্ণ সুরক্ষিত ও হাইড ব্যাকএন্ড
export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    // সিক্রেট ইউজার আইডি এবং পাসওয়ার্ড যা ব্যাকএন্ডে লক করা
    const SECURE_USER = "ovi369";
    const SECURE_PASS = "ovi965960#";

    if (username === SECURE_USER && password === SECURE_PASS) {
        // লগইন সফল হলে একটি সিকিউর টোকেন রেসপন্স পাঠানো হবে
        return res.status(200).json({ success: true, token: "SJ_SESSION_SECURE_AUTH_VALID_2026" });
    } else {
        // ভুল পাসওয়ার্ড হলে রিজেক্ট করা হবে
        return res.status(401).json({ success: false, error: "INVALID CREDENTIALS" });
    }
}
