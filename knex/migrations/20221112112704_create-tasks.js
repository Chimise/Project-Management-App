/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.enu('status', [0, 1, 2], {useNative: true, enumName: 'status_type'}).defaultTo(0);
    table.timestamps(true, true);
    table.integer('project_id').unsigned().notNullable();
    table.foreign('project_id').references('projects.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
