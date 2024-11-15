const knex = require("../db/knex");

module.exports = {
  async getAllCategories() {
    return knex("categories").select("*");
  },

  async createCategory({name}) {
    return knex('categories').insert({ name }).returning('*');
  },

  async updateCategory({id, name}){
    return knex('categories').where({ id }).update({ name }).returning('*');
  },

  async deleteCategory({id}){
    return knex('categories').where({ id }).del();
  }
};
