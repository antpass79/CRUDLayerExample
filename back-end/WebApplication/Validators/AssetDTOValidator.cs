using Backend.Models;
using FluentValidation;

namespace Backend.Validators
{
    public class AssetDTOValidator : AbstractValidator<AssetDTO>
    {
        public AssetDTOValidator()
        {
            RuleFor(t => t.FileName).NotEmpty();
            RuleFor(t => t.MimeType).NotEmpty();
            RuleFor(t => t.Description).NotEmpty();
            RuleFor(t => t.CreatedBy).NotEmpty();
            RuleFor(t => t.Country).NotEmpty();
            RuleFor(t => t.Email).NotEmpty().EmailAddress();
        }
    }

    public class AssetDTOPOSTValidator : AbstractValidator<AssetDTOPOST>
    {
        public AssetDTOPOSTValidator()
        {
            RuleFor(t => t.Id).NotEmpty();
            RuleFor(t => t.FileName).NotEmpty();
            RuleFor(t => t.MimeType).NotEmpty();
            RuleFor(t => t.Description).NotEmpty();
            RuleFor(t => t.CreatedBy).NotEmpty();
            RuleFor(t => t.Country).NotEmpty();
            RuleFor(t => t.Email).NotEmpty().EmailAddress();
        }
    }
}