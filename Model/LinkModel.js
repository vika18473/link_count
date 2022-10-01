import mongoose from "mongoose";
import {Types, model} from "mongoose"

const LinkSchema = new mongoose.Schema(
    {
        from : {type: String, required: true},
        to : {type : String, required: true, unique: true},
        code : {type : String, required: true, unique: true},
        date : {type: Date, default:Date.now},
        clicks : {type: Number, default: 0},
        owner : {type: Types.ObjectId, ref : "UserModel"}
    }
)

export default model("LinkSchema", LinkSchema)
