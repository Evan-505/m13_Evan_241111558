const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretkey"
};

passport.use(
    new JwtStrategy(
        options,
        async (payload, done) =>{
            try {
                return done(null, payload);
            }catch (eror){
                return done(eror, false);
            }
        }
    )
);
module.exports = passport;