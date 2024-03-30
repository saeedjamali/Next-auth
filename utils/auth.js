import { compare, hash } from "bcrypt"
import { sign, verify } from "jsonwebtoken"


const hashPassword = async (password) => {
    return await hash(password, 12)

}

const generateToken = (data) => {

    return sign({ ...data }, process.env.privateKey, { expiresIn: "1h" });
}


const verifyPassword = async (password, hashedPassword) => {
    return await compare(password, hashedPassword);

}

const verifyToken = (token) => {
    try {
        const payloadToken = verify(token, process.env.privateKey);
        return payloadToken;
    } catch (error) {
        console.log(error);
        return false
    }
}
export { hashPassword, generateToken, verifyPassword, verifyToken }