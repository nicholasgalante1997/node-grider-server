// loading express library
const express = require('express');
// loading mongoose library for mongoDB ORM;
const mongoose = require('mongoose');
// private URI key for mongoDB;
const keys = require('./config/keys');
// cookie-session lib
const cookieSession = require('cookie-session');
// authentication library
const passport = require('passport');
/* 
a lone require statement can be used to invoke all of the code in a file
if we need the contents of a file to be executed, but it doesn't return anything 
thus we wouldn't need to save it to a variable, we can use a require(path);
*/
require('./models/User');
require('./services/passport');

// initialzing mongoose to mongoDB through private key;
mongoose.connect(keys.mongoURI);

// initializing express lib
const app = express();
// priming express for use of cookie session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());
/* 
require('./routes/authRoutes') returns a function
we immediately invoke that function, passing in an argument of app;
through passing in app as an argument, 
we attach it to the two route handlers in authRoutes that use app.get(...)
this is how we can have routes in separate individual files based on purpose;
*/
require('./routes/authRoutes')(app);

// if a production port is available use that, if not use port 5000;
const PORT = process.env.PORT || 5000;
// initialize express app to listen to requests on PORT (similar to controller)
app.listen(PORT);