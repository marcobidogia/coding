export interface CounterState {
    value: number;
    loading: boolean;
}

export const counterInitialState: CounterState = {
    loading: false,
    value: 0
}