/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_messages', table => {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable();
    table.integer('message_id').unsigned().notNullable();
    table.timestamps(false, true);
    table.boolean('viewed').defaultTo(false);
    table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('message_id').references('messages.id').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user_messages');
};
