# CRUDLayerExample

This is a simple application that uses Angular as the frontend and ASPNET WebApi as the backend.

The aims of the project are:

- use NgRx for managing the state of the Angular application.
- create an abstraction layer for CRUD operations as a separate project.
- define the CRUD project as an artifact in Azure DevOps, in order to use NuGet for downloading the package and reference it in the Web Application.

## Running the Application

In order to run the application, follow these steps:

- run backend Web Application from Visual Studio (the default port is 62677)
- run the frontend Angular Application from a cmd with administrative privileges:

  - go under the front-end folder

  - to install all packages

        npm install

  - to run the application

        ng serve front-end

The application calls the server runs on the port 62677. You can change it through the config.json.

The url to call is:

        http://localhost:4200/#/assets
