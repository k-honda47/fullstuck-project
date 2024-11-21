## Setupメモ
```
1. createdb todo_app 
2. npm i knex pg dotenv
3. npx knex init
4. migration fileの作成：npx knex migrate:make create_XXXX_table
5. npx knex seed:make initial_XXX --timestamp-filename-prefix
```
