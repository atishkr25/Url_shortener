const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema(
{
    shortId : {
        type : String,
        required : true,
        unique: true,
    },
    redirectURL :{
        type : String,
        required : true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number,
                required: true,
            },
            ip: {
                type: String,
                default: 'Unknown',
            },
            country: {
                type: String,
                default: 'Unknown',
            },
            city: {
                type: String,
                default: 'Unknown',
            },
            device: {
                type: String,
                enum: ['mobile', 'tablet', 'desktop'],
                default: 'desktop',
            },
            browser: {
                type: String,
                default: 'Unknown',
            },
            os: {
                type: String,
                default: 'Unknown',
            },
            referrer: {
                type: String,
                default: 'Direct',
            },
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
} , 
{ timestamps : true }
);


const URL = mongoose.model("url" , urlSchema)

module.exports = URL;