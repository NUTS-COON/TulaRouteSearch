﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Swashbuckle.AspNetCore.Examples;
using Swashbuckle.AspNetCore.Swagger;
using System.IO;
using TulaRouteSearcherAPI.Repositories;
using TulaRouteSearcherAPI.Services;

namespace TulaRouteSearcherAPI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddStores(this IServiceCollection services, string connectionString)
        {
            services.AddTransient<DbRepository>(provider => new DbRepository(connectionString));

            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<IHereService, HereService>();
            services.AddTransient<IRouteSearcher, RouteSearcher>();

            return services;
        }

        public static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "API", Version = "v1" });
                c.OperationFilter<ExamplesOperationFilter>();
                c.OperationFilter<DescriptionOperationFilter>();
                var xmlPath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "TulaRouteSearcherAPI.xml");
                c.IncludeXmlComments(xmlPath);
            });

            return services;
        }
    }
}
