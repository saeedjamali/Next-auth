const { default: connectToDB } = require("@/utils/db")
import userModel from "@/models/user"
import { generateToken, hashPassword } from "@/utils/auth"
import { serialize } from "cookie";

const handler = async (req, res) => {
    const reqData = req.query;
    const { firstname, lastname, username, email, password } = req.body;
    const { status, message, isConnected } = await connectToDB();
    if (isConnected) {
        if (req.method != "POST") {
            return res.status(402).json({ message: "Invalid Request" })
        }

        try {

            //Data Validation
            if (!firstname?.trim() || !lastname?.trim() || !username?.trim() || !email?.trim() || !password?.trim()) {
                return res.status(422).json({ message: "Data is not Valid!" })
            }


            // User Exist 
            const isUserExist = await userModel.findOne({ $or: [{ username }, { email }] });
            if (isUserExist) {
                return res.status(422).json({ message: "This username or email exist already !! " })
            }

            //Hashed Password
            const hashedPassword = await hashPassword(password);

            //Generate Token
            const token = generateToken({ username, email });

            //Create new User 
            const statusSignUp = await userModel.create({ firstname, lastname, username, email, password: hashedPassword, rule: "USER" });
            return res
                .setHeader('Set-Cookie', serialize('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 }))
                .status(200)
                .json({ message: "User Created Succesfully :))" })

        } catch (error) {
            return res.status(500).json({ message: `UnKnown Error : ${error}` })
        }



    } else {
        return res.status(402).json({ message })
    }
}

export default handler