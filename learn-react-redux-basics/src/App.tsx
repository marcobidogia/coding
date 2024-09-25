import './App.css';
import {CounterController} from "./data-layer/counter/controller";
import {useDispatch, useSelector} from "react-redux";
import {storeDispatcher, storeRoot} from "./data-layer/store";
import {incrementByAmount} from "./data-layer/counter/reducers";

function App() {
    let counter = new CounterController(useSelector((store: storeRoot) => store.counter), useDispatch<storeDispatcher>());
    let counter1 = new CounterController(useSelector((store: storeRoot) => store.counter), useDispatch<storeDispatcher>());

    let counter2 = useSelector((store: storeRoot) => store.counter);
    let dispatcher1 = useDispatch();

    return (
        <>
            {/*using controller class*/}
            <div>
                state is loading {counter1.getLoadingState().toString()}
            </div>
            <div>
                {counter.getValue()}
                <button onClick={() => counter.increment(6)}>increment 6</button>
            </div>
            <div>
                {counter1.getValue()}
                <button onClick={() => counter1.increment(1)}>increment 1</button>
                <button onClick={() => counter1.loadValueDelayed()}>load value from backend</button>
            </div>

            {/*standard way*/}
            <div>
                {counter2.value}
                <button onClick={() => dispatcher1(incrementByAmount(123))}>increment 123</button>
            </div>
        </>);
}

export default App;
