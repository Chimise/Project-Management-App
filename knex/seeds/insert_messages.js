/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('messages').del()
  await knex('messages').insert([
    {id: 1, title: "Welcome to Taskr!", content: "Hello! Welcome to Taskr - the place to breakdown your projects into smaller managable tasks! Navigate to the 'Projects' page and get started right away! We hope you have a pleasant experience organizing your work."},
    {id: 2, title: "Thanks for your support", content: "Thanks a lot for your support, we really appreciate"},
  ]);
};
