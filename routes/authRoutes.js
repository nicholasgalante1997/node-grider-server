// require passport library
const passport = require('passport');

// export a default function that expects a parameter of an express app;
module.exports = (app) => {

    /* we pass in app to have access to the single instance of express(),that was 
    instantiated in index.js, and use it to handle these specific routes */

    // first route that sends to google permissions page
    
    app.get(
        '/auth/google', 
        passport.authenticate('google', 
        {
            scope: ['profile', 'email']
        })
    );

    // second route that handles receiving the token and passing it to passport via 
    // passsport.authenticate('google'), which is set up in '../services/passport.js'

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google')
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}
