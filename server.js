const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static(__dirname));


// ===============================
// TELEGRAM CONFIG
// ===============================

const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";


// ===============================
// SEND MESSAGE
// ===============================

app.post("/send-message", async (req, res) => {

    const { topic, details } = req.body;

    if (!topic || !details) {

        return res.status(400).json({
            success: false
        });

    }


    const message =
`📩 New Submission

📌 Topic:
${topic}

📝 Details:
${details}`;


    try {

        const telegramURL =
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;


        const response = await fetch(telegramURL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                chat_id: CHAT_ID,

                text: message

            })

        });


        const result = await response.json();


        if (result.ok) {

            res.json({
                success: true
            });

        } else {

            res.status(500).json({
                success: false
            });

        }

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
