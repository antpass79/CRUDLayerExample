using Backend.Validators;
using FluentValidation.Attributes;
using System;

namespace Backend.Models
{
    [Validator(typeof(AssetDTOValidator))]
    public class AssetDTO
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public DateTime CreatedOn { get; set; }
        public string MimeType { get; set; }
        public string CreatedBy { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
    }

    [Validator(typeof(AssetDTOPOSTValidator))]
    public class AssetDTOPOST : AssetDTO
    {
    }
}