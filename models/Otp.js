import mongoose from "mongoose";
const schema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        require: true

    },
    expTime: {
        type: Number,
        required: true,
    }

},
    {
        timestamps: true,
    }
)



const Otp = mongoose.models?.Otp || mongoose.model("Otp", schema);
export default Otp