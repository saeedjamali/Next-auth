import otpModel from "@/models/Otp"
import connectToDB from "@/utils/db";

const handler = async (req, res) => {

    const { code, phone } = req.body;
    try {
        const { isConnected, message } = await connectToDB();
        if (!isConnected) {
            return res.status(500).json({ message });
        }
        const otp = await otpModel.findOne({ phone, code });
        if (!otp) {
            return res.status(409).json({ message: "verfication code is not correct" });
        }

        const now = new Date().getTime() ;
        if (otp.expTime < now) {
            return res.status(410).json({ message: "Verification code is Expired" });
        }
        return res.status(201).json({ message: "Verification code is accepted" });

    } catch (error) {
        return res.json({ error });
    }

}

export default handler