// Scopo: un thread principale deve salvare i dati in modo async ad una velocitá di 500ms l'uno dall'altro, il metodo di salvataggio ci mette 2 secondi.
// Il dato piú importante é sempre l'ultimo arrivato quindi al termine del salvataggio viene preso il dato piú nuovo possibile.

var test = new TestThreadClass();
test.StartMainThread();

while (true)
{
    Thread.Sleep(1000);
    Console.WriteLine($"{DateTime.Now.Subtract(test.StartTime):G} - value: {test.Value}");
}

public class TestThreadClass
{
    public int Value;
    public DateTime StartTime = DateTime.MinValue;
    public Mutex mut = new Mutex();

    public void StartMainThread()
    {
        var mainThread = new Thread(() =>
        {
            StartTime = DateTime.Now;
            for (int i = 1; i < 100; i++)
            {
                Console.WriteLine($"{DateTime.Now.Subtract(StartTime):G}\tstarted task to set value: {i}");
                new Task(() => StoreValue(i)).Start();
                Thread.Sleep(500);
            }
        });
        mainThread.Start();
    }

    private void StoreValue(int newValue)
    {
        if (mut.WaitOne(20))
        {
            Console.WriteLine($"{DateTime.Now.Subtract(StartTime):G}\t\t\tsetting value: {newValue}");
            Thread.Sleep(2000);
            Value = newValue;
            Console.WriteLine($"{DateTime.Now.Subtract(StartTime):G}\t\t\tset new value: {newValue}");
            
            mut.ReleaseMutex();
        }
        else
        {
            Console.WriteLine($"{DateTime.Now.Subtract(StartTime):G}\t\tskipped task to set value: {newValue}");
        }
    }
}