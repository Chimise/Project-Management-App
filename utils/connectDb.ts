import knex, {Knex} from 'knex';
import config from './knexfile.js';


declare global {
    var pg: {
        instance: Knex<any, unknown[]>
    };
}

let cached = global.pg
if (!cached) cached = global.pg = {} as {instance: Knex<any, unknown[]>}

export function getKnex() {
  if (!cached.instance) cached.instance = knex(config);
  return cached.instance
};