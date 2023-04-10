/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcryptjs');


exports.seed = async function(knex) {
    // Deletes ALL existing entriess
    const user = {
        email: 'testuser@gmail.com',
        name: 'Test User',
        password: 'testpassword'
    }

    const testUser = await knex('users').where('email', user.email).select('email');
    if(testUser && testUser[0] && testUser[0].email) {
        return;
    }

    const hashPassword = await bcrypt.hash(user.password, 10);

    await knex('users').insert({...user, password: hashPassword});
  };
  
  
      