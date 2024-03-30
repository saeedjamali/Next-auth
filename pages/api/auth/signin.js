const { default: connectToDB } = require("@/utils/db")
import userModel from "@/models/user"
import { generateToken, verifyPassword } from "@/utils/auth"
import { serialize } from "cookie";

const handler = async (req, res) => {
    const reqData = req.query;
    const { identifier, password } = req.body;

    const { status, message, isConnected } = await connectToDB();
    if (isConnected) {
        if (req.method != "POST") {
            return res.status(402).json({ message: "Invalid Request" })
        }
        try {
            //Data Validation
            if (!identifier?.trim() || !password?.trim()) {
                return res.status(422).json({ message: "Data is not Valid!" })
            }
            //User Exists ?
            const isUserExist = await userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
            if (!isUserExist) {
                return res.status(404).json({ message: "User is not Registered!!" })
            }

            //Verify Password
            const { password: hashedPassword } = isUserExist;
            if (!await verifyPassword(password, hashedPassword)) {
                return res.status(422).json({ message: "username or Password is not correct!!" })
            }

            //Generate Token
            const token = generateToken({ username: isUserExist.username, email: isUserExist.email });
            return res
                .setHeader('Set-Cookie', serialize('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 }))
                .status(200)
                .json({ message: "User login Succesfully :))" })

        } catch (error) {
            return res.status(500).json({ message: `UnKnown Internal Server Error : ${error}` })
        }

    } else {
        return res.status(402).json({ message })
    }
}

export default handler