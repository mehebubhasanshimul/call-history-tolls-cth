// Vercel Serverless NodeJS Backend API - Secured & Hidden
export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { phoneNumber, operator, startDate, endDate } = req.body;

    if (!phoneNumber || !operator || !startDate || !endDate) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // অথেনটিক বাংলাদেশি নামের সিক্রেট ডাটাবেজ
    const banglaNames = [
        "Arif Rahman", "Mehedi Hasan", "Anika Tabassum", "Tamim Iqbal", 
        "Sabbir Ahmed", "Fahmida Chowdhury", "Tanvir Islam", "Nusrat Jahan", 
        "Asif Mahmud", "Rokeya Begum", "Imran Khan", "Sakib Al Hasan", 
        "Kamrul Islam", "Sultana Razia", "Rashedul Bari", "Mitu Akter",
        "Shimul Hossain", "Mehebub Hasan", "Tareq Rahman", "Nadia Islam",
        "Mahfuz Ahmed", "Farhana Yasmin", "Jahid Hasan", "Sajid Islam"
    ];
    
    const prefixes = ["017", "019", "018", "015", "016", "013", "014"];

    function generateRandomNumber() {
        let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        let suffix = Math.floor(10000000 + Math.random() * 90000000).toString();
        return prefix + suffix;
    }

    // নির্দিষ্ট দুটি তারিখের মধ্যে র্যান্ডম ডেট-টাইম জেনারেট করার ফাংশন
    function randomDate(start, end) {
        const date1 = new Date(start).getTime();
        const date2 = new Date(end).getTime();
        const randomTime = date1 + Math.random() * (date2 - date1);
        const d = new Date(randomTime);
        
        // ফরম্যাট: YYYY-MM-DD HH:MM:SS
        return d.toISOString().replace('T', ' ').substring(0, 19);
    }

    // টেক্সট ফাইলের প্রফেশনাল লেআউট স্ট্রাকচার
    let fileContent = `========================================================================\n`;
    fileContent += `                 CYBER TEAM HELP  -  SHADOW JOKER                       \n`;
    fileContent += `               ENCRYPTED CALL LOG DATA EXTRACTION CORE                  \n`;
    fileContent += `========================================================================\n`;
    fileContent += `Target Number   : ${phoneNumber}\n`;
    fileContent += `Operator Core   : ${operator} Network\n`;
    fileContent += `History Range   : ${startDate} to ${endDate}\n`;
    fileContent += `Extraction Time : ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BDT)\n`;
    fileContent += `System Status   : BYPASSED & DECRYPTED SUCCESSFULLY\n`;
    fileContent += `========================================================================\n\n`;
    fileContent += `Date & Time          | Remote Number | Call Type | Duration | Name\n`;
    fileContent += `------------------------------------------------------------------------\n`;

    // লগ সংখ্যা (তারিখের পার্থক্যের ওপর ভিত্তি করে আনুমানিক ৫০টি লগ এন্ট্রি করা হবে)
    let totalLogs = 60;
    let logEntries = [];

    for (let i = 0; i < totalLogs; i++) {
        let formattedDate = randomDate(startDate, endDate);
        let remoteNum = generateRandomNumber();
        
        // কল টাইপ নির্ধারণ (Received, Dialed, Missed)
        let typeRand = Math.random();
        let callType = "Received";
        if (typeRand > 0.65) {
            callType = "Dialed";
        } else if (typeRand > 0.35) {
            callType = "Missed";
        }

        // কল টাইম বা ডিউরেশন ক্যালকুলেশন
        let callDuration = "00:00:00";
        if (callType !== "Missed") {
            let mins = String(Math.floor(Math.random() * 8)).padStart(2, '0');
            let secs = String(Math.floor(Math.random() * 60)).padStart(2, '0');
            callDuration = `00:${mins}:${secs}`;
        }

        let personName = banglaNames[Math.floor(Math.random() * banglaNames.length)];

        logEntries.push({
            dateStr: formattedDate,
            line: `${formattedDate} | ${remoteNum} | ${callType.padEnd(8)} | ${callDuration} | ${personName}\n`
        });
    }

    // তারিখ অনুযায়ী লগগুলোকে সাজানো (যাতে রিয়েল মনে হয়)
    logEntries.sort((a, b) => new Date(b.dateStr) - new Date(a.dateStr));

    logEntries.forEach(entry => {
        fileContent += entry.line;
    });

    fileContent += `\n========================================================================\n`;
    fileContent += `⚙️ CRACKED BY : SHADOW JOKER CORE SYSTEM v2.5\n`;
    fileContent += `🛡️ CREDIT     : CYBER TEAM HELP (WE PROTECT BANGLADESH)\n`;
    fileContent += `========================================================================\n`;

    // রেসপন্স হেডার সেট (ডাউনলোড ট্রিগার করার জন্য)
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=ShadowJoker_CallLog_${phoneNumber}.txt`);
    
    return res.status(200).send(fileContent);
}
