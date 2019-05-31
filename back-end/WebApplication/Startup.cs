using Backend;
using FluentValidation.WebApi;
using Microsoft.Owin;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Owin;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

//https://www.davepaquette.com/archive/2014/03/18/seeding-entity-framework-database-from-csv.aspx

[assembly: OwinStartupAttribute(typeof(WebExperience.Test.Startup))]
namespace WebExperience.Test
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration configuration = new HttpConfiguration();
            WebApiConfig.Register(configuration);
            UnityConfig.RegisterComponents(configuration);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            ConfigureFormatters(configuration);
            ConfigureValidators(configuration);

            //Install - Package Microsoft.AspNet.WebApi.OwinSelfHost
            app.UseWebApi(configuration);
        }
        private void ConfigureFormatters(HttpConfiguration configuration)
        {
            var appXmlType = configuration.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            configuration.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);

            var jsonFormatter = configuration.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            configuration.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new IsoDateTimeConverter
            {
                DateTimeFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fff'Z'"
            });
        }

        private void ConfigureValidators(HttpConfiguration configuration)
        {
            FluentValidationModelValidatorProvider.Configure(configuration);
        }
    }
}
