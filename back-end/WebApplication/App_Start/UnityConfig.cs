using Backend.CRUD.Services;
using Backend.Entities;
using Backend.Models;
using Backend.Validators;
using CRUD.Repositories;
using CRUD.Services;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Dependencies;
using Unity;

namespace Backend
{
    public static class UnityConfig
    {
        public static void RegisterComponents(HttpConfiguration configuration)
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<IGenericRepository<Asset>, AssetsRepository>();
            container.RegisterType<IGenericService<AssetDTO>, AssetDTOService>();

            container.RegisterType<IValidator<AssetDTO>, AssetDTOValidator>();
            container.RegisterType<IValidator<AssetDTOPOST>, AssetDTOPOSTValidator>();

            configuration.DependencyResolver = new UnityResolver(container);
        }
    }

    public class UnityResolver : IDependencyResolver
    {
        protected IUnityContainer container;

        public UnityResolver(IUnityContainer container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container");
            }
            this.container = container;
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return new List<object>();
            }
        }

        public IDependencyScope BeginScope()
        {
            var child = container.CreateChildContainer();
            return new UnityResolver(child);
        }

        public void Dispose()
        {
            container.Dispose();
        }
    }
}