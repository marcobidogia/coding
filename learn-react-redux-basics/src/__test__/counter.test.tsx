import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { incrementByAmount, decrementByAmount, asyncLoadValue } from "../data-layer/counter/reducers";
import { counterInitialState } from "../data-layer/counter/state";

describe("counterSlice", () => {
    let store: any;

    beforeEach(() => {
        // Crea un mock store Redux per ogni test
        store = configureStore({
            reducer: {
                counter: counterReducer,
            },
            preloadedState: {
                counter: counterInitialState,
            }
        });
    });

    it("should handle initial state", () => {
        // Verifica lo stato iniziale
        const state = store.getState().counter;
        expect(state).toEqual(counterInitialState);
    });

    it("should increment the counter by a given amount", () => {
        // Dispatch dell'azione incrementByAmount
        store.dispatch(incrementByAmount(3));

        const state = store.getState().counter;
        expect(state.value).toBe(counterInitialState.value + 3);
    });

    it("should throw error if increment goes over 10", () => {
        // Imposta lo stato iniziale in modo che sia vicino a 10
        store = configureStore({
            reducer: {
                counter: counterReducer,
            },
            preloadedState: {
                counter: { value: 8, loading: false }
            }
        });

        // Verifica che l'errore venga lanciato quando si incrementa oltre 10
        expect(() => store.dispatch(incrementByAmount(3))).toThrowError(
            "Value can not go over value 10"
        );
    });

    it("should decrement the counter by a given amount", () => {
        // Dispatch dell'azione decrementByAmount
        store.dispatch(decrementByAmount(2));

        const state = store.getState().counter;
        expect(state.value).toBe(counterInitialState.value - 2);
    });

    it("should set loading to true when asyncLoadValue is pending", () => {
        // Dispatch dell'azione pending manuale
        // @ts-ignore
        store.dispatch(asyncLoadValue.pending('', {}));

        const state = store.getState().counter;
        expect(state.loading).toBe(true);
    });

    it("should set loading to false and update value when asyncLoadValue is fulfilled", (done) => {
        store.dispatch(asyncLoadValue());

        setTimeout(() => {
            const state = store.getState().counter;
            expect(state.loading).toBe(false);
            done();
        }, 2500)
    });

    it("should handle asyncLoadValue after 2 second delay", (done) => {
        store.dispatch(asyncLoadValue());

        setTimeout(() => {
            const state = store.getState().counter;
            expect(state.value).toBe(9);
            done();
        }, 2500)
    });
});
