/**
 * Created by Terry on 2016-12-17.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Define our model

const feedbackSchema = new Schema({
    name: String,
    title: String,
    department: String,
    overall: {
        type: String, // "O", "E", "M", "NI", "U"
    },
    comments: {
        type: String,
    },
    reviewer: {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'employee'},
        name: String,
        title: String,
        department: String
    },
    reviewee: {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'employee'},
        name: String,
        title: String,
        department: String
    },
    submitted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('feedback', feedbackSchema);