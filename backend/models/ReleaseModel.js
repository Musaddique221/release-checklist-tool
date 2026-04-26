import mongoose from "mongoose"
const releaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    additionalInfo: {
        type: String,
        default: ""
    },
    steps: {
        type: [Boolean],
        default: [false, false, false, false, false, false, false],
    },
},
    { timestamps: true })


    const Release = mongoose.model("Release",releaseSchema)
    export default Release