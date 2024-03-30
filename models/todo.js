import mongoose from "mongoose";
const schema = mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    isDone: {
        type: Boolean,
        default: false

    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    }

},
    {
        timestamps: true,
    }
)



const todo = mongoose.models?.todo || mongoose.model("todo", schema);
export default todo