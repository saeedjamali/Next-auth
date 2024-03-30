import connectToDB from "@/utils/db";
import userModel from "@/models/user"
import todoModel from "@/models/todo"
import { verifyToken } from "@/utils/auth";

const handler = async (req, res) => {

    const { isDone, title } = req.body;
    const { token } = req.cookies;

    try {
        // Connecte to Db
        const { isConnected, message } = await connectToDB();
        if (!isConnected) return res.status(500).json({ message })
        if (req.method == "POST") {
            const payloadToken = verifyToken(token);
            if (!payloadToken) {
                return res.status(401).json({ message: "You are not login !!" })
            }

            const user = await userModel.findOne({ email: payloadToken.email });
            if (user) {
                const newTodo = {
                    title,
                    isDone,
                    user: user._id
                }
                const todo = await todoModel.create(newTodo);
                if (todo) {
                    return res.status(201).json({ message: "Todo Added Successfully :))" })
                }
                return res.status(401).json({ message: "Todo Not Added - Try Again !!" })

            } else {
                return res.status(403).json({ message: "User Not Found !!" })
            }
        }


    } catch (error) {
        return res.status(500).json({ message: "UnKnown Error !!", error })
    }





}


export default handler;