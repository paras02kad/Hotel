const mongoose = require('mongoose');
const { default: stripAnsi } = require('strip-ansi');

//! Encrypting the given password
const bcrypt = require('bcrypt');

//! Define the person schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String

    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    //! so we will hash the password only if it is a new or modified record.
    if (!person.isModified('password'))
        return next();
    else

        try {
            //! Hash password generation
            const salt = await bcrypt.genSalt(10);

            //! Now we will hash password
            const hashedPassword = await bcrypt.hash(person.password, salt);

            //! Now override the plain password with the hashed password
            person.password = hashedPassword;

            next();
        }
        catch (err) {
            console.log(err);

        }


})

personSchema.methods.comparePassword = async function (candidatePasword) {
    try {
        //! using bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePasword, this.password);
        return isMatch;
        
    }
    catch (err) {
        throw err;
    }
}


//! define person model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;



