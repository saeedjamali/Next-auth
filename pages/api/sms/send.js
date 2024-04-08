const request = require('request');
import otpModel from "@/models/Otp"
import connectToDB from "@/utils/db";



const handler = async (req, res) => {

    const { phone } = req.body;
    const code = Math.floor(Math.random() * 99999).toString().padEnd(5, "0");

    if (req.method != "POST") {
        return false;
    }
    request.post({
        url: 'http://ippanel.com/api/select',
        body: {
            "op": "pattern",
            "user": "u09151208032",
            "pass": "Faraz@1408650850000068",
            "fromNum": "3000505",
            "toNum": `${phone}`,
            "patternCode": "uzjj070v0q8v36y",
            "inputData": [
                { "verification-code": code }
            ]
        },
        json: true,
    }, async function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
            // console.log(response.body);
            const { isConnected } = await connectToDB();
            if (!isConnected) {
                return res.status(500).json({ message: "Error in connect to db :))" });
            }

            const otp = await otpModel.findOneAndUpdate({ phone }, { code, expTime: new Date().getTime()+120000 });
            if (otp) {
                return res.status(201).json({ message: "Code Sent Successfully :))" });
            } else {
                const opt = await otpModel.create({ code, phone, expTime: new Date().getTime() });
                return res.status(201).json({ message: "User Create and Code Sent Successfully :))" });
            }

        } else {
            console.log("whatever you want");
            return res.status(500).json({ message: "Unknown Error!!!" });

        }
    });
}

export default handler;