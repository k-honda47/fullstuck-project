exports.up = function(knex) {
    return knex.schema.createTable('transaction_categories', function(table) {
      table.integer('transaction_id').unsigned().notNullable()
           .references('id').inTable('transaction_data').onDelete('CASCADE');
      table.integer('category_id').unsigned().notNullable()
           .references('id').inTable('categories').onDelete('CASCADE');
      table.primary(['transaction_id', 'category_id']);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transaction_categories');
  };
  