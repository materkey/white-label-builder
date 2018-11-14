export const CHANGE_ROUTE = 'CHANGE_ROUTE';

export const changeRoute = (value) => {
    return {
        type: CHANGE_ROUTE,
        payload: {
            value,
        },
    }
};
