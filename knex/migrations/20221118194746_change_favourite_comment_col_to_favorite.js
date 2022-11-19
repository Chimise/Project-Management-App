/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('comments', table => {
    table.dropColumn('favourite');
    table.boolean('favorite').defaultTo(false)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('comments', table => {
    table.dropColumn('favorite');
    table.boolean('favourite').defaultTo(false);
  })
};
