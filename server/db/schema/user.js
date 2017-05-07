import mongoose, { Schema } from 'mongoose';
// import passportLocalMongoose from 'passport-local-mongoose';

const ROLES = ['ADMIN', 'USER', 'MANAGER'];

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        enum: ROLES
    }
});

userSchema.methods.verifyPassword = function (password) {
    return password && password === this.password;
};

// userSchema.plugin(passportLocalMongoose, {
//     usernameField: 'email'
// });
export default mongoose.model('User', userSchema);