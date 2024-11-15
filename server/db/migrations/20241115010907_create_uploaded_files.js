exports.up = function(knex) {
    return knex.schema.createTable('uploaded_files', function(table) {
      table.increments('id').primary();
      table.string('file_name').notNullable();
      table.string('file_path').notNullable();
      table.timestamp('uploaded_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('uploaded_files');
  };
  