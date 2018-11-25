import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import { task } from './../utils/schemas';

export const START_TASK_LOADING = 'START_TASK_LOADING';
export const SUCCESS_TASK_LOADING = 'SUCCESS_TASK_LOADING';
export const ERROR_TASK_LOADING = 'ERROR_TASK_LOADING';
export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TASK_STATE = 'UPDATE_TASK_STATE';


export const loadTasks = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_TASK_LOADING,
                {
                    type: SUCCESS_TASK_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                return Object.assign({}, normalize(json, [task]));
                            },
                        );
                    },
                },
                ERROR_TASK_LOADING,
            ],
        },
    };
};

export const createTask = (value) => {
    return {
        type: CREATE_TASK,
        payload: {
            value,
        },
    }
};

export const updateTask = (value) => {
    return {
        type: UPDATE_TASK_STATE,
        payload: {
            value,
        },
    }
};
























// import { CALL_API, apiMiddleware, getJSON } from 'redux-api-middleware';
// [CALL_API]: {
//     credentials: 'include',
//     endpoint: '/api/tasks/',
//     method: 'GET',
//     types: [
//         'REQUEST',
//         {
//             type: 'SUCCESS',
//             payload: (action, state, res) => {
//                 return getJSON(res).then(
//                     (json) => {
//                         const normalizedData = normalize(json.results, [task]);
//                         delete json.results;
//                         return Object.assign({}, json, normalizedData);
//                     },
//                 );
//             },
//         },
//         'FAILURE',
//     ],
// },
