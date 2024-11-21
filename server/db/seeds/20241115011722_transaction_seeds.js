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
      date: "2024-11-05",
      description: "スーパーで買い物",
      type: "expense",
    },
    {
      id: 2,
      amount: -1500.0,
      date: "2024-11-06",
      description: "電車代",
      type: "expense",
    },
    {
      id: 3,
      amount: 250000.0,
      date: "2024-11-05",
      description: "給料",
      type: "income",
    },
    {
      id: 4,
      amount: -8000.0,
      date: "2024-11-10",
      description: "映画",
      type: "expense",
    },
  ]);
};
