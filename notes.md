# HTML & CSS
No flexbox and grid. Learn from freeCodeCamp.

# JavaScript 
Objects & callbacks: 163, 166, 168, 171

# Node
Port 3000 is in use: https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server

# MongoDB
Installation: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/ 

MongoDB issue: https://stackoverflow.com/questions/37565758/mongodb-not-working-on-ubuntu-mongod-service-failed-with-result-exit-code

# Heroku deployment preparation
- Set up connection to MongoDB Altas DB

- Create `Procfile`

        web: node app.js

- Include Node.js version in `package.json`

        "engines": {
            "node": "18.0.0"
        }

- Add Heroku listening port in `app.js`

        app.listen(process.env.PORT || 3000, function() {
            console.log("Server is running.");
        });