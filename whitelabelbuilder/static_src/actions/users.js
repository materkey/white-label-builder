import { CALL_API, getJSON } from 'redux-api-middleware';

export const START_USER_LOADING = 'START_USER_LOADING';
export const SUCCESS_USER_LOADING = 'SUCCESS_USER_LOADING';
export const ERROR_USER_LOADING = 'ERROR_USER_LOADING';
export const CREATE_USER = 'CREATE_USER';


export const loadCurrentUser = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_USER_LOADING,
                {
                    type: SUCCESS_USER_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                return json;
                            },
                        );
                    },
                },
                ERROR_USER_LOADING,
            ],
        },
    };
};

export const createUser = (value) => {
    return {
        type: CREATE_USER,
        payload: {
            value,
        },
    }
};
