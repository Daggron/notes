import passsPortLocal from 'passport-local';
const LocalStrategy = passsPortLocal.Strategy;
import User from '../models/user.model';
import Bcrypt from 'bcryptjs';

export default async  function(passport){
    passport.use(new LocalStrategy({usernameField:'email'},async (email , password , done)=>{
        let user = await User.findOne({email:email});
        if(!user){
            return done(null,false,'No User found with that email');
        }
        else{
            if(user){
                    let match =await Bcrypt.compare(password,user.password);
                    if(!match){
                        return done(null,false,'Email or password is incorrect');
                    }
                    else{
                        return done(null,user);
                    }
            }
        }
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}
