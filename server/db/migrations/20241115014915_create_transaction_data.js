exports.up = function (knex) {
    return knex.schema.createTable("transaction_data", function (table) {
      table.increments("id").primary();
      table.decimal("amount", 10, 2).notNullable();
      table.date("date").notNullable();
      table.string("description");
      table.enu("type", ["income", "expense"]).notNullable();
      
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("transaction_data");
  };
  