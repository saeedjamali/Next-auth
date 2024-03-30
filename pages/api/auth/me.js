const { default: connectToDB } = require("@/utils/db");
import userModel from "@/models/user"
import { verifyToken } from "@/utils/auth";

const handler = async (req, res) => {
    const { token } = req.cookies;
    if (req.method != "GET") {
        return false;
    }
    try {

        const { isConnected, message } = await connectToDB();
        if (!isConnected) {
            return res.status(500).json({ message: "error in connected to db." })
        }

        const payloadToken = verifyToken(token);
        if (!payloadToken) {
            return res.status(401).json({ message: "You are not login !!" })
        }

        const user = await userModel.findOne({ email: payloadToken.email }, "firstname lastname rule");
        if (user) {
            return res.status(200).json({ message: "User is login !!", data:user })
        }
        return res.status(401).json({ message: "User not found!! plz signin again" })

    } catch (error) {
        return res.status(500).json({ message: `UnKnown Internal Server Error : ${error}` })
    }

}

export default handler