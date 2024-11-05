using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ScopedServices;

var builder = new HostApplicationBuilder();

builder.Services.AddScoped<ISum, Sum>();
builder.Services.AddScoped<ISubtraction, Subtraction>();
builder.Services.AddHostedService<OperationController>();

var host = builder.Build();

host.Run();