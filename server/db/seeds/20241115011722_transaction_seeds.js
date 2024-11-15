/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("transaction_data").del();
  await knex("transaction_data").insert([
    {
      id: 1,
      amount: -5000.0,
      date: "2024-01-05",
      description: "スーパーでの買い物",
      type: "expense",
    },
    {
      id: 2,
      amount: -1500.0,
      date: "2024-01-06",
      description: "バス代",
      type: "expense",
    },
    {
      id: 3,
      amount: 300000.0,
      date: "2024-01-25",
      description: "給料",
      type: "income",
    },
    {
      id: 4,
      amount: -8000.0,
      date: "2024-01-10",
      description: "映画館での鑑賞",
      type: "expense",
    },
  ]);
};
