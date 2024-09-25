import counter from "./interface";
import {storeDispatcher} from "../store";
import {asyncLoadValue, decrementByAmount, incrementByAmount} from "./reducers";
import {CounterState} from "./state";

export class CounterController implements counter {
    private readonly counter: CounterState | null = null;
    private readonly dispatcher: storeDispatcher | null = null;

    constructor(counter: CounterState, dispatcher: storeDispatcher) {
        this.counter = counter;
        this.dispatcher = dispatcher;
    }

    getValue(): number {
        if (this.counter == null) {
            throw new Error('counter is null')
        }
        return this.counter.value;
    };

    getLoadingState(): boolean {
        if (this.counter == null) {
            throw new Error('counter is null')
        }
        return this.counter.loading;
    };

    loadValueDelayed(): void {
        if(this.dispatcher == null) {
            return;
        }

        this.dispatcher(asyncLoadValue());
    }

    increment(amount: number): void {
        if(this.dispatcher == null) {
            return;
        }
        try{
        this.dispatcher(incrementByAmount(amount));
            }
        catch(error){console.log(error);}
    }

    decrement(amount: number): void {
        if(this.dispatcher == null) {
            return;
        }
        this.dispatcher(decrementByAmount(amount));
    }
}