type State<T> = {
    [key: string]: T
}



const state = <T>() => {
    const state: State<T> = {};

    const add = <V extends T>(key: string, value: V) => {
        Object.assign(state, { [key]: value });
        return value;
    }

    return {
        state,
        add
    }
}



export default state;
