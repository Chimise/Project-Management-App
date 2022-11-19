/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('tasks', (table) => {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('tasks', (table) => {
    table.dropForeign('user_id');
    table.dropColumn('user_id');
  })
};
