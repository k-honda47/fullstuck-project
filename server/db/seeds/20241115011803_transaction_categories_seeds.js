/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transaction_categories').del()
  await knex('transaction_categories').insert([
    { transaction_id: 1, category_id: 1 }, // スーパーでの買い物 - 食費
    { transaction_id: 2, category_id: 2 }, // バス代 - 交通費
    { transaction_id: 3, category_id: 6 }, // 給料 - 給料
    { transaction_id: 4, category_id: 5 }, // 映画鑑賞 - 娯楽
  ]);
};
