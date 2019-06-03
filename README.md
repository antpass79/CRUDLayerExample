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

## Azure DevOps Artifacts

The following sections describe the procedure, the easiest one, to create a build pipeline and the feed for CRUD project, in order to be consumed by the ASPNET Web Application.
Some steps in Azure DevOps are taken for granted, for example creating a new project, adding a repository from GitHub.

### Create a Feed

From the Artifacts section of Azure DevOps, create a new Feed with a name (for example TeamFeed).

After that, connect the feed, specifying NuGet.

Copy the link for NuGet Gallery in order to use it from Visual Studio for dowloading the package.

### Build Pipeline

After adding the source under a new project in Azure DevOps, it will possible to create a build pipeline for the project.

Under Azure DevOps -> Pipelines -> Build, create a new pipeline, specifying the repository added above.

The pipeline is this one:

    trigger:
    - master

    pool:
    vmImage: 'windows-latest'

    variables:
    buildConfiguration: 'Release'
    folderName: 'back-end/CRUD'
    projectName: 'CRUD'

    steps:
    - task: DotNetCoreCLI@2
    inputs:
        command: 'pack'
        arguments: --output $(build.artifactstagingdirectory) --configuration $(buildConfiguration)
        packagesToPack: '$(folderName)/$(projectName).csproj'
        versioningScheme: byPrereleaseNumber
        versionEnvVar: byPrereleaseNumber
        majorVersion: 0
        minorVersion: 1
        patchVersion: 0

    - task: DotNetCoreCLI@2
    inputs:
        command: 'push'
        nuGetFeedType: 'internal'
        packagesToPush: '$(build.artifactStagingDirectory)/*.nupkg'
        publishVstsFeed: "TeamFeed"

    - task: PublishBuildArtifacts@1

The first DotNetCoreCLI@2 command build and pack the CRUD project, under the $(build.artifactStagingDirectory) folder.
The second DotNetCoreCLI@2 command push the pack in the TeamFeed, previously created.
the PublishBuildArtifacts@1 command pubish the artifact.
