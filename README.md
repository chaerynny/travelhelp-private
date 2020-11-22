# Travel Help
<img src="https://user-images.githubusercontent.com/66960200/99899007-60533500-2ce9-11eb-8db5-ff3f8c9ba958.png" alt="1" width="22%"/>
<img src="https://user-images.githubusercontent.com/66960200/99899012-647f5280-2ce9-11eb-947d-d1f4c78570ec.png" alt="2" width="22%"/>
<img src="https://user-images.githubusercontent.com/66960200/99899010-62b58f00-2ce9-11eb-98b2-ff0d48bcdd82.png" alt="3" width="22%"/>
<img src="https://user-images.githubusercontent.com/66960200/99899014-66491600-2ce9-11eb-9ba0-3462d7bcc46e.png" alt="4" width="22%"/>

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
