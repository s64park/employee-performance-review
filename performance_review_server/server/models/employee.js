/**
 * Created by Terry on 2016-11-28.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
// Define our model
const employeeSchema = new Schema({
    username: String,   // when login for confidential company information or by oneself
    password: String,   // when login for confidential company information or by oneself
    firstname: String,
    lastname: String,
    email: { type: String, lowercase: true },
    title: String,
    department: String,
    contact: String,
    address: String,
    requiringFeedbacks: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'feedback' }], default: [] },
    submittedFeedbacks: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'feedback'}], default: [] }
}, {
    timestamps: true
});

// On Save Hook, encrypt password
// Before saving a model, run this function

// generates hash
employeeSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
employeeSchema.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Create the model class
export default mongoose.model('employee', employeeSchema);