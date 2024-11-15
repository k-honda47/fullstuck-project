const knex = require("../db/knex");

module.exports = {
  async uploadPDF({
    file_name: originalname,
    mime_type: mimetype,
    file_data: buffer,
  }) {
    return knex("uploaded_files").insert({
      file_name: originalname,
      mime_type: mimetype,
      file_data: buffer,
    });
  },
};
