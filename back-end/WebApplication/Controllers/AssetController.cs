using Backend.Models;
using CRUD.Services;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace Backend.Controllers
{
    public class AssetController : ApiController
    {
        // TODO
        // Create an API controller via REST to perform all CRUD operations on the asset objects created as part of the CSV processing test
        // Visualize the assets in a paged overview showing the title and created on field
        // Clicking an asset should navigate the user to a detail page showing all properties
        // Any data repository is permitted
        // Use a client MVVM framework

        IGenericService<AssetDTO> _service;
        IValidator<AssetDTO> _putValidator;
        IValidator<AssetDTOPOST> _postValidator;

        public AssetController(IGenericService<AssetDTO> service, IValidator<AssetDTO> putValidator, IValidator<AssetDTOPOST> postValidator)
        {
            _service = service;
            _putValidator = putValidator;
            _postValidator = postValidator;
        }

        [HttpGet()]
        public IEnumerable<AssetDTO> Get()
        {
            return _service.Get();
        }

        [HttpPost()]
        public void Post(AssetDTOPOST asset)
        {
            if (!_postValidator.Validate(asset).IsValid)
                throw new InvalidOperationException();

            _service.Update(asset);
        }

        [HttpPut()]
        public void Put(AssetDTO asset)
        {
            if (!_putValidator.Validate(asset).IsValid)
                throw new InvalidOperationException();

            _service.Insert(asset);
        }

        [HttpDelete()]
        public void Delete(Guid id)
        {
            _service.Delete(id);
        }
    }
}