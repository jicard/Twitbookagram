import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true
    },
    email: {
        type: String, 
        unqiue: true, 
        required: true,
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.types.ObjectId,
            ref: "User"
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        id: false
    }
}
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);

export default User;
//mongoose.model("User", userSchema);
