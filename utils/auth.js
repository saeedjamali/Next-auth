import { hash } from "bcrypt"
import { sign } from "jsonwebtoken"


const hashPassword = async (password) => {
    return await hash(password, 12)

}

const generateToken = (data) => {

    return sign({ ...data }, process.env.privateKey, { expiresIn: "1m" });
}

export { hashPassword, generateToken }