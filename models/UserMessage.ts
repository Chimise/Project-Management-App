import { BaseSchema } from "../utils";
import { getKnex } from "../utils/connectDb";

export interface Message extends BaseSchema {
    title: string;
    content: string;
  }

export interface UserMessageSchema extends BaseSchema {
    user_id: number;
    viewed: boolean;
    message_id: number;
  }

type FindValues = Pick<UserMessageSchema, 'message_id'|'user_id'|'id'>

class UserMessage {
    id: number;
    user_id: number;
    viewed: boolean;
    message_id: number;
    created_at: string;
    updated_at: string
    message!: Message;

    constructor({id, user_id, viewed, message_id, created_at, updated_at}: UserMessageSchema) {
        this.id = id;
        this.user_id = user_id;
        this.viewed = viewed;
        this.message_id = message_id;
        this.created_at = created_at;
        this.updated_at = updated_at;

    }

    static async insert(values: Omit<FindValues, 'id'> | Omit<FindValues, 'id'>[]) {
        const knex = getKnex();
        const messages = await knex<UserMessageSchema>('user_messages').insert(values).returning('*');
        const userMessages = await Promise.all(messages.map(async message => {
            const userMessage = new UserMessage(message);
            await userMessage.getMessage();
            return userMessage;
        }))
        return userMessages;
    }

    async getMessage() {
        const knex = getKnex();
        const messages: Message[] = await knex<UserMessageSchema>('user_messages').select('messages.*').join<Message>('messages', 'user_messages.message_id', 'messages.id').where('user_messages.user_id', this.user_id).andWhere('user_messages.message_id', this.message_id);
        this.message = messages[0];
    }

    static async findOne(values: Partial<FindValues>) {
        const knex = getKnex();
        const message = (await knex<UserMessageSchema>('user_messages').select('*').where(values))[0]
        if(!message) {
            return null;
        }
        const userMessage =  new UserMessage(message);
        await userMessage.getMessage();
        return userMessage;
    }

    static async find(values: Partial<FindValues>) {
        const knex = getKnex();
        const messages = await knex<UserMessageSchema>('user_messages').select('*').where(values);
        if(messages.length === 0) {
            return [];
        }
        const userMessages = await Promise.all(messages.map(async message => {
            const userMessage = new UserMessage(message);
            await userMessage.getMessage();
            return userMessage;
        }));

        return userMessages;
    }

    async viewMessage() {
        const knex = getKnex();
        await knex<UserMessageSchema>('user_messages').update({viewed: true}).where({id: this.id});
        this.viewed = true;
    }

    toJSON() {
        const {user_id, viewed, id, created_at, updated_at, message} = this
        return {
            user_id,
            viewed,
            id,
            created_at,
            updated_at,
            message
        }
    }

}

export default UserMessage;