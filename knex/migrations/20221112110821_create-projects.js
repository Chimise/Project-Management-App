/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.timestamps(true, true);
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('projects')
};
