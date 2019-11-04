const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1", //3306
  user: "root",
  password: "shirley123",
  database: "grubHub"
});
connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn" + err);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      console.log("in login");
      connection.query("SELECT * FROM buyer WHERE email = ?", [email], function(
        error,
        results,
        fields
      ) {
        console.log("backedn received email is", email);
        console.log("backedn received passport is", password);
        if (error) {
          console.log("error ocurred", error);
          return cb(err);
        } else {
          if (results.length > 0) {
            console.log(results[0].password);
            if (results[0].password == password) {
              var user = results[0];
              console.log("USER IN BACK");
              console.log(user);
              return cb(null, user, {
                message: "Logged In Successfully"
              });
            } else {
              console.log("Email and password does not match");
              console.log("error ocurred", error);
              return cb(err);
            }
          } else {
            console.log("Email does not exits");
            console.log("error ocurred", error);
            return cb(null, false, { message: "Incorrect email or password." });
          }
        }
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed
      return UserModel.findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
