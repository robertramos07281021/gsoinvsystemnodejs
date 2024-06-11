require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/expressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const MemoryStore = require('memorystore')(session);
const gsoRouter = require('./server/routers/gsoRouter');
const gsoUsersRouter = require('./server/routers/gsoUsersRouter')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT
const cors = require('cors')
const corsOptions = require('./config/corsOptions')


mongoose.set('strictQuery', false)
connectDB();

app.set('trust proxy',1)
app.engine('ejs', ejsMate);


app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

const sessionConfig = {
  coockie: {
    maxAge: 86400000
  },
  secret: 'SecretLangTo',
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
  saveUninitialized: true,
  resave: false
}



app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.addEvent = req.flash('addEvent');
  res.locals.updateEvent = req.flash('updateEvent');
  res.locals.deleteEvent = req.flash('deleteEvent');
  res.locals.requestReceivedSuccess = req.flash('requestReceivedSuccess');
  next();
})


app.use('', gsoUsersRouter);
app.use('', gsoRouter);

app.use('*',(req,res,next) => {
  next(new ExpressError('Page not Found', 404));
})

app.use((err, req, res, next) => {
  const {statusCode = 500} = err;
  if(!err.message) err.message = 'Something went wrong!';
  res.status(statusCode).render('error',{err});
})

// app.listen(8000, ()=> {
//   console.log('Welcom to GSOInventory Server running in port 8000')
// })

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
})