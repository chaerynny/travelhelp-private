const { User } = require('../../models');
const passport = require('passport');
const LineStrategy = require('passport-line-auth').Strategy;
const credentials = require('../../config/line.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = () => {
  passport.serializeUser((user, cb) => {
    console.log("serializeUser:", user)
    cb(null, user);
  })

  passport.deserializeUser((obj, cb) => {
    console.log("deserializeUser:", user)
    cb(null, obj);
  })

  passport.use(new LineStrategy({
    channelID: credentials.web.channelID,
    channelSecret: credentials.web.channelSecret,
    callbackURL: credentials.web.callbackURL,
    scope: ['profile', 'openid', 'email'],
    botPrompt: 'normal'
  },
    async function(accessToken, refreshToken, params, profile, cb) {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile:', profile);
      console.log('params:', params.id_token);
      // should be applied after permission of Line Corp.
      const { email } = jwt.decode(params.id_token);
      profile.email = email;
      console.log('email:', email);
      const name = profile.displayName;
      const userData = await User.findOne({ where: { email: email } });

      if(userData) {
        return cb(null, userData);
      }
      else {
        const hash_password = await bcrypt.hash(process.env.secret, 10);
        const newUser = await User.create({
          email: email,
          password: hash_password,
          name: name,
          oauth_provider: 'line',
          visit_count: 1,
          is_email_verified: true,
          is_policy_agreed: true
        });
        return cb(null, newUser);
      }
    }
  ))
}