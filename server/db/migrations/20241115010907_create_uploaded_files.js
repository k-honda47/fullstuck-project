exports.up = function(knex) {
  return knex.schema.alterTable('uploaded_files', function(table) {
    table.dropColumn('file_path'); // ファイルパスのカラムを削除
    table.specificType('file_data', 'bytea').notNullable(); // ファイルデータのカラムを追加
    table.string('mime_type').notNullable(); // MIMEタイプのカラムを追加
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('uploaded_files', function(table) {
    table.dropColumn('file_data');
    table.dropColumn('mime_type');
    table.string('file_path').notNullable();
  });
};