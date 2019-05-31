CREATE TABLE [dbo].[Assets] (
    [Id]          UNIQUEIDENTIFIER NOT NULL,
    [FileName]    NVARCHAR (50)    NULL,
    [CreatedBy]   NVARCHAR (50)    NOT NULL,
    [CreatedOn]   DATETIME         NOT NULL,
    [MimeType]    NVARCHAR (50)    NULL,
    [Email]       NVARCHAR (50)    NOT NULL,
    [Country]     NVARCHAR (50)    NOT NULL,
    [Description] NVARCHAR (MAX)   NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

