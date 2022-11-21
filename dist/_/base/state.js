const state = () => {
    const state = {};
    const add = (key, value) => {
        Object.assign(state, { [key]: value });
        return value;
    };
    return {
        state,
        add
    };
};
export default state;
