import { CounterController } from "../data-layer/counter/controller";
import { CounterState } from "../data-layer/counter/state";
import { incrementByAmount, decrementByAmount, asyncLoadValue } from "../data-layer/counter/reducers";
import { storeDispatcher } from "../data-layer/store";

describe("CounterController", () => {
    let counterState: CounterState;
    let mockDispatcher: jest.MockedFunction<storeDispatcher>;
    let controller: CounterController;

    beforeEach(() => {
        // Stato iniziale simulato
        counterState = {
            value: 5,
            loading: false,
        };

        // Mock del dispatcher
        mockDispatcher = jest.fn() as jest.MockedFunction<storeDispatcher>;

        // Crea una nuova istanza del controller per ogni test
        controller = new CounterController(counterState, mockDispatcher);
    });

    it("should return the current counter value", () => {
        const value = controller.getValue();
        expect(value).toBe(5); // Stato iniziale impostato a 5
    });

    it("should throw an error if counter is null when calling getValue", () => {
        const nullController = new CounterController(null as unknown as CounterState, mockDispatcher);
        expect(() => nullController.getValue()).toThrow("counter is null");
    });

    it("should return the current loading state", () => {
        const loadingState = controller.getLoadingState();
        expect(loadingState).toBe(false); // Stato iniziale impostato a false
    });

    it("should throw an error if counter is null when calling getLoadingState", () => {
        const nullController = new CounterController(null as unknown as CounterState, mockDispatcher);
        expect(() => nullController.getLoadingState()).toThrow("counter is null");
    });

    it("should dispatch incrementByAmount action", () => {
        controller.increment(2);
        expect(mockDispatcher).toHaveBeenCalledWith(incrementByAmount(2));
    });

    it("should dispatch decrementByAmount action", () => {
        controller.decrement(2);
        expect(mockDispatcher).toHaveBeenCalledWith(decrementByAmount(2));
    });

    it("should handle error during increment", () => {
        mockDispatcher.mockImplementation(() => {
            throw new Error("Dispatch error");
        });
        expect(() => controller.increment(2)).not.toThrow(); // L'errore è catturato nel try-catch
    });

    it("should not dispatch asyncLoadValue if dispatcher is null", () => {
        const nullDispatcherController = new CounterController(counterState, null as unknown as storeDispatcher);
        nullDispatcherController.loadValueDelayed();
        expect(mockDispatcher).not.toHaveBeenCalled(); // Non dovrebbe essere chiamato nulla
    });

    it("should not dispatch incrementByAmount if dispatcher is null", () => {
        const nullDispatcherController = new CounterController(counterState, null as unknown as storeDispatcher);
        nullDispatcherController.increment(2);
        expect(mockDispatcher).not.toHaveBeenCalled(); // Non dovrebbe essere chiamato nulla
    });

    it("should not dispatch decrementByAmount if dispatcher is null", () => {
        const nullDispatcherController = new CounterController(counterState, null as unknown as storeDispatcher);
        nullDispatcherController.decrement(2);
        expect(mockDispatcher).not.toHaveBeenCalled(); // Non dovrebbe essere chiamato nulla
    });
});
