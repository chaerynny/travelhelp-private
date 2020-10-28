const app = require('express')();
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3355;
const dotenv = require('dotenv');
dotenv.config();

// declare env variable
const env = process.env;

const options = {
  username: env.username,
  password: env.password,
  database: env.database,
  host: env.host,
  port: env.port,
  dialect: env.dialect
}

const sessionStorage = new mysqlStore(options);

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// mysql session managing
app.use(
  session({
    secret: env.secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie: {
      domain: 'http://localhost:3355',
      expires: new Date(Date.now() + (20000))
    }
  })
);

app.get('/', (req, res) => {
  res.send('welcome to the travel help!');
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});

module.exports = app;