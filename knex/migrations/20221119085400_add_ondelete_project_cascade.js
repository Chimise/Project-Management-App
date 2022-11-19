/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('tasks', (table) => {
    table.dropForeign('project_id');
    table.foreign('project_id').references('projects.id').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('tasks', table => {
    table.dropForeign('project_id');
    table.foreign('project_id').references('projects.id');
  })
};
