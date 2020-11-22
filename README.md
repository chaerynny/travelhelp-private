# Travel Help

Concierge service for the foreign travelers in Korea.

## Getting Started

### Prerequisites

- npm: npm install separately in `client` and `server` each.

```
/client npm install
/server npm install
```

### Versions
```
nodeJS v14.15.0
npm v6.14.8
nvm v0.36.0
```

### Config information

You need 4 config environments information.
- AWS RDS information  `/server/.env`
- Google Oauth Client API Keys  `/server/config/google.json`
- Line Oauth Client API Keys  `/server/config/line.json`
- Channel Talk API Keys  `/client/src/config/channelTalk.json`


## Built With

* [React](https://reactjs.org/) - Frontend, framework
* [NodeJS](https://nodejs.org/en) - Backend, server
* [Express](https://expressjs.com/) - Backend, server
* [Mysql](https://www.mysql.com/) - Backend, DB
* [Sequelize](https://sequelize.org/master) - Backend, ORM


## Versioning
- 0.0.1
  - Work in progress

## Contributors

* **[Brother Kim](https://github.com/imbrok)**
* **[Chaeryn Park](https://github.com/chaerynny)**
