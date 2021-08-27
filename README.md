# tomei-technical-test
## Backend
#### _Running Server_
- npm i
- change config/config.json
- sequelize db:create
- sequelize db:migrate
- npm run dev
#### _Testing Server_
- NODE_ENV=test sequelize db:create
- NODE_ENV=test sequelize db:migrate
- npm run test