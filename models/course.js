import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    }

}, {
    timestamps: true,
}
)

const course = mongoose.models?.course || mongoose.model("course", schema);
export default course