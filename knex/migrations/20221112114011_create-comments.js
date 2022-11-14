/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('comments', table => {
    table.increments('id');
    table.string('message', 500);
    table.boolean('like').defaultTo(false);
    table.boolean('favourite').defaultTo(false);
    table.timestamps(true, true);
    table.integer('task_id').unsigned().notNullable();
    table.foreign('task_id').references('tasks.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
