//! We keep all the autorization related stuff here



const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new localStrategy(async (username, password, done) => {
    try {
      //console.log('Receieved Credentials:', username, password);
      const user = await Person.findOne({ username });
  
      if (!user)
        return done(null, false, { message: 'Incorrect username.' });
  
      const isPassowrdMatch = await user.comparePassword(password);

      if (isPassowrdMatch) {
        return done(null, user);
      }
  
      else {
        return (null, false, { message: 'Incorrect Password' });
      }
  
    } catch (error) {
      return done(error);
  
    }
  }));

  module.exports = passport;
