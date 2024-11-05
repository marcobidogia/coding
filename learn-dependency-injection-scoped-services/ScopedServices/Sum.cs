namespace ScopedServices;

public class Sum(): ISum
{
    public int A { get; set; }
    public int B { get; set; }
    
    public int Add()
    {
        return A + B;
    }
}