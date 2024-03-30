const { default: connectToDB } = require("@/utils/db");
import todoModel from "@/models/todo"
import { verifyToken } from "@/utils/auth";

const handler = async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.query;
    const { isDone } = req.body;

    console.log("isDone: ", isDone);
    // if (req.method == "DELETE") {
    try {


        const { isConnected, message } = await connectToDB();
        if (!isConnected) {
            return res.status(500).json({ message: "error in connected to db." })
        }

        const payloadToken = verifyToken(token);
        if (!payloadToken) {
            return res.status(401).json({ message: "You are not login !!" })
        }

        if (req.method == "DELETE") {
            const todo = await todoModel.findOneAndDelete({ _id: id });
            if (todo) {
                return res.status(200).json({ message: "Todo is Removed SuccessFully:(", todo })
            }
            return res.status(401).json({ message: "User not found!! plz signin again" })
        }

        if (req.method == "PUT") {
            const todo = await todoModel.findOneAndUpdate({ _id: id }, {isDone});
            if (todo) {
                return res.status(200).json({ message: "Todo is Update Successfully:(", todo })
            }
            return res.status(401).json({ message: "User not found!! plz signin again" })
        }

    } catch (error) {
        return res.status(500).json({ message: `UnKnown Internal Server Error : ${error}` })
    }
    // }


}

export default handler