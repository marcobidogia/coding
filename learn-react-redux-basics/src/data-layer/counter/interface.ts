export default interface counter
{
    getValue(): number;
    getLoadingState(): boolean;
    loadValueDelayed(): void;
    increment(amount: number): void;
    decrement(amount: number): void;
}