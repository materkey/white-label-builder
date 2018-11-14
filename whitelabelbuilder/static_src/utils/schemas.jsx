import { schema } from 'normalizr';

export const currentUser = new schema.Entity('currentUser');

export const user = new schema.Entity('users');

export const task = new schema.Entity('tasks', {
    author: user,
});
