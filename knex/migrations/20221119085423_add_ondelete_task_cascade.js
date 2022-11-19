

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('comments', table => {
        table.dropForeign('task_id');
        table.foreign('task_id').references('tasks.id').onDelete('CASCADE').onUpdate('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('comments', table => {
    table.dropForeign('task_id');
    table.foreign('task_id').references('tasks.id');
  })
};
