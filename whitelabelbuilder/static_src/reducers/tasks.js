import update from 'react-addons-update';
import { START_TASK_LOADING, SUCCESS_TASK_LOADING, ERROR_TASK_LOADING, CREATE_TASK, UPDATE_TASK_STATE } from '../actions/tasks';


const initialState = {
    taskList: [],
    tasks: {},
    isLoading: false,
};


export default function tasks(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.tasks) {
        newStore = update(store, {
            tasks: { $merge: action.payload.entities.tasks },

        });
    }

    switch (action.type) {
        case START_TASK_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_TASK_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                taskList: { $set: action.payload.result },
            });
        }
        case ERROR_TASK_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        case CREATE_TASK: {
            const task = {
                [action.payload.value.id]: action.payload.value,
            };
            const taskId = {
                [action.payload.value.id]: action.payload.value.id,
            };
            return update(newStore, {
                tasks: { $merge: task },
                taskList: { $merge: taskId },

            });
        }
        case UPDATE_TASK_STATE: {
            const task = {
                [action.payload.value.id]: Object.assign(newStore.tasks[action.payload.value.id], action.payload.value),
            };
            // const taskId = {
            //     [action.payload.value.id]: action.payload.value.id,
            // };
            return update(newStore, {
                tasks: { $merge: task },

            });
        }
        default:
            return newStore;
    }
}
