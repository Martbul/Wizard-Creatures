1) init project structure
2) set up developer enviroment
3) install express, handlebars and nodemon
    - configure static middleware
    - configure bodyparser
    - configure routers
4) add images and css in public directory
5) add html files in views directory
6) configure view engine
    - add main layout
    - fix public styles hyperlinks
    - render home page in hbs
7) convert all html views in to hbs views
    - group views by meaning
8) add controller folder with controller
9) add database 
    - install mongoose
    - connect to db
10) prepare user functuanality
    - user controller
    - add controller to routes
    - fix navigations in the nav bar(login, register, logout)
    - render login page
    - render register page
11) add user model 
    - simple validaton in schema 
    - add method for register
    - create first user record in the db
    - validate password missmatch
    - validate email already exists
12) hash password 
    - install bcrypt
    - hash password
13) login
    - find user by email
    - validate password with hash
14) generate jsonwebtoken
    - install jsonwebtoken
    - promisify jsonwebtoken
    - generete secret
    - generate token in service login
15) return token in cookie
    - install cookie-parser
    - configure cookie-parser
    - set cookie with the token
16) Implement logout
17) authentication middleware
    - create middleware directory
    - add auth middleware and import it nn express configuration bewol cookieParser
    - decode the token 
    - handle invalid token
    - provida authorization
18) dynamic navigation
    - conditioanal options in navigation
    - add data to res.locals for hbs template
19) error handling
    - add 404 page
    - redirect missing route to 404
    - add global error handler(optional)
    - add error message util
20) show error notification
    - show in the main layout
    - pass error to render in login and register pages
21) automatically login after register