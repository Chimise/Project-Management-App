/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('reports').del()
  await knex('reports').insert([
    {id: 1, title: "Taskr v1.0.0", content: "Taskr is currently in Beta stage production, you can keep track your own projects, add and update tasks, add comments and check messages or reports", action: 'Learn More'},
  ]);
};


    
