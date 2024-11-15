const knex = require("../db/knex");

module.exports = {
  async getAllTransactions() {
    return knex("transaction_data").select("*").orderBy("date", "desc");
  },

  async createTransaction({amount, date, description, type, category_id}) {
    return knex("transactions")
      .insert({
        amount,
        date,
        description,
        type,
        category_id,
      })
      .returning("*");
  },
};
