/**
 * Created by Terry on 2016-12-14.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
// Define our model
const adminSchema = new Schema({
    username: String,   // when login for confidential company information or by oneself
    password: String,   // when login for confidential company information or by oneself
    firstname: String,
    lastname: String,
    email: { type: String, lowercase: true },
    title: String,
    department: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function

// generates hash
adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
adminSchema.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Create the model class
export default mongoose.model('admin', adminSchema);