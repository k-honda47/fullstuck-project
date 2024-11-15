/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { id: 1, name: '食費' },
    { id: 2, name: '交通費' },
    { id: 3, name: '住居費' },
    { id: 4, name: '光熱費' },
    { id: 5, name: '娯楽' },
    { id: 6, name: '給料' },
    { id: 7, name: 'その他' }
  ]);
};
