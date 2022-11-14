/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('messages', table => {
    table.increments('id');
    table.string('title', 100).notNullable();
    table.string('content', 1000).notNullable();
    table.boolean('viewed').defaultTo(false);
    table.timestamps(true, true);
  })
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};
