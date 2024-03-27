import mongoose from "mongoose";
import course from "@/models/course"
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    }}, 
    {
        timestamps: true,
    }
)

schema.virtual("course", {
    ref: "course",
    localField: "_id",
    foreignField: "user"
});

const user = mongoose.models?.user || mongoose.model("user", schema);
export default user