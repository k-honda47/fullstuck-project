1. createdb todo_app 
2. npm i knex pg dotenv
3. npx knex init
4. migration fileの作成：npx knex migrate:make create_XXXX_table
5. npx knex seed:make initial_XXX --timestamp-filename-prefix


models:
server.js
```
const knex = require('../db/knex')
module.exports = {
  async findAll() {
    return knex('todos').select('*')
  }
}
```

index.js
```
const app = require('./server')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
```