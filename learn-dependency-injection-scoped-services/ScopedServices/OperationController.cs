using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ScopedServices;

public class OperationController(IServiceProvider serviceProvider): IHostedService
{
    int _a;
    int _b;
    public int Sum = 0;
    public int Sub = 0;

    public Task StartAsync(CancellationToken cancellationToken)
    {
        Task.Run(() =>
        {
            _a = 10;
            _b = 5;

            // variables are available in the scope before dispose command
            var scope = serviceProvider.CreateScope();
            var myService = scope.ServiceProvider.GetRequiredService<ISum>(); 
            myService.A = _a;
            myService.B = _b;
            Console.WriteLine("Scope 1: {0}", myService.Add());
            scope.Dispose();
            
            var scope1 = serviceProvider.CreateScope();
            var myService1 = scope.ServiceProvider.GetRequiredService<ISum>();
            Console.WriteLine("Scope 2: {0}", myService1.Add());
            scope1.Dispose();
        });
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}