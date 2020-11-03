const app = require('express')();
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const port = process.env.SERVER_PORT || 3355;
const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
  origin: "http://localhost:5533",
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

// declare env variable for managing session
const env = process.env;
const options = {
  host: env.host,
  port: env.port,
  user: env.username,
  password: env.password,
  database: env.database
}
const sessionStorage = new mysqlStore(options);

// mysql session managing
app.use(
  session({
    secret: env.secret,
    resave: false,
    saveUninitialized: false,
    store: sessionStorage,
    cookie: {
      // domain: 'http://localhost:3355',
      // cookie valid for a day
      maxAge: 6000 * 60 * 24
    }
  })
);

// routing
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('welcome to the travel help!');
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});

module.exports = app;
