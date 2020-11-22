# Travel Help
<img src="https://user-images.githubusercontent.com/66960200/99899085-d3f54200-2ce9-11eb-9b9b-20cce9e1165d.png" alt="1" width="90%"/>

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
- 0.1.0
  - Released
  
## License
This project is licensed under the MIT License.

## Contributors
* **[Brother Kim](https://github.com/imbrok)**
* **[Chaeryn Park](https://github.com/chaerynny)**
