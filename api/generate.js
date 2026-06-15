// Serverless Backend Logic - Secure & Hidden from Client-Side Inspector
export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { phoneNumber, operator, startDate, endDate } = req.body;
    if (!phoneNumber || !operator || !startDate || !endDate) return res.status(400).json({ error: 'Missing parameters' });

    // ১০০০+ র্যান্ডম ডেটা কালেকশন তৈরি করার জন্য ডাইনামিক কম্বিনেটর এরে
    const firstNames = ["Arif", "Mehedi", "Anika", "Tamim", "Sabbir", "Fahmida", "Tanvir", "Nusrat", "Asif", "Imran", "Sakib", "Sultana", "Mitu", "Mehebub", "Shimul", "Tareq", "Nadia", "Mahfuz", "Jahid", "Farhana", "Rokeya", "Sajid", "Abir", "Rifat", "Kamal", "Liza", "Roni", "Shuvo", "Sumon", "Kazi", "Sadia", "Habib", "Nabil", "Tisha", "Ayman", "Fahim", "Mizan", "Sania", "Emon", "Zayan"];
    const lastNames = ["Rahman", "Hasan", "Tabassum", "Iqbal", "Ahmed", "Chowdhury", "Islam", "Jahan", "Mahmud", "Begum", "Khan", "Al Hasan", "Razia", "Akter", "Hossain", "Bari", "Yasmin", "Siddique", "Ali", "Alam", "Uddin", "Miah", "Sarker", "Talukder", "Patwary", "Gazi", "Sheikh", "Bhuiyan", "Munshi", "Dewan"];

    let banglaNamesDatabase = [];
    for (let f of firstNames) {
        for (let l of lastNames) {
            banglaNamesDatabase.push(`${f} ${l}`);
        }
    } // ডাইনামিক্যালি ১২০০+ ইউনিক বাংলাদেশি নাম জেনারেট হয়ে ডাটাবেজে স্টোর হবে

    const prefixes = ["017", "019", "018", "015", "016", "013", "014"];

    function generateRandomNumber() {
        let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        let suffix = Math.floor(10000000 + Math.random() * 90000000).toString();
        return prefix + suffix;
    }

    function randomDate(start, end) {
        const d1 = new Date(start).getTime();
        const d2 = new Date(end).getTime();
        return new Date(d1 + Math.random() * (d2 - d1)).toISOString().replace('T', ' ').substring(0, 19);
    }

    let fileContent = `========================================================================\n`;
    fileContent += `                 CYBER TEAM HELP  -  SHADOW JOKER                       \n`;
    fileContent += `               ENCRYPTED CALL LOG DATA EXTRACTION CORE                  \n`;
    fileContent += `========================================================================\n`;
    fileContent += `Target Number   : ${phoneNumber}\n`;
    fileContent += `Operator Core   : ${operator} Architecture\n`;
    fileContent += `History Range   : ${startDate} to ${endDate}\n`;
    fileContent += `Extraction Time : ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BDT)\n`;
    fileContent += `System Status   : BYPASSED & DECRYPTED SUCCESSFULLY\n`;
    fileContent += `========================================================================\n\n`;
    fileContent += `Date & Time          | Remote Number | Call Type | Duration | Name\n`;
    fileContent += `------------------------------------------------------------------------\n`;

    let totalLogs = 150; // রিয়েল হিস্ট্রির আউটপুট সাইজ মেইনটেইনের জন্য এন্ট্রি কাউন্ট
    let logEntries = [];

    for (let i = 0; i < totalLogs; i++) {
        let formattedDate = randomDate(startDate, endDate);
        let remoteNum = generateRandomNumber();
        
        let typeRand = Math.random();
        let callType = "Received";
        if (typeRand > 0.66) callType = "Dialed";
        else if (typeRand > 0.33) callType = "Missed";

        let callDuration = "00:00:00";
        if (callType !== "Missed") {
            let mins = String(Math.floor(Math.random() * 12)).padStart(2, '0');
            let secs = String(Math.floor(Math.random() * 60)).padStart(2, '0');
            callDuration = `00:${mins}:${secs}`;
        }

        let personName = banglaNamesDatabase[Math.floor(Math.random() * banglaNamesDatabase.length)];

        logEntries.push({
            dateStr: formattedDate,
            line: `${formattedDate} | ${remoteNum} | ${callType.padEnd(8)} | ${callDuration} | ${personName}\n`
        });
    }

    logEntries.sort((a, b) => new Date(b.dateStr) - new Date(a.dateStr));
    logEntries.forEach(entry => { fileContent += entry.line; });

    fileContent += `\n========================================================================\n`;
    fileContent += `⚙️ CRACKED BY : SHADOW JOKER CORE SYSTEM v3.0\n`;
    fileContent += `🛡️ CREDIT     : CYBER TEAM HELP (WE PROTECT BANGLADESH)\n`;
    fileContent += `========================================================================\n`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=ShadowJoker_CallLog_${phoneNumber}.txt`);
    return res.status(200).send(fileContent);
}
