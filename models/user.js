import mongoose from "mongoose";
const schema = mongoose.Schema({
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,

    },
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    rule: {
        type: String,
        required: true,
    }

},
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