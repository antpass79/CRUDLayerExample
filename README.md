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

The following sections describe the procedure, the easiest one, to create a build pipeline and the feed for CRUD project, in order to be consumed by the ASPNET Web Application through NuGet package manager.
Some steps in Azure DevOps are taken for granted, for example creating a new project, adding a repository from GitHub.

So, after creating a new project and connecting it with GitHub, I follow these steps:

- create a feed
- build pipeline
- consume CRUD package

### Create a Feed

From the Artifacts section of Azure DevOps, I created a new Feed with a name (for example TeamFeed).

![create-feed](assets/create-feed.jpg)

After that, I connected the feed, specifying NuGet.

![connect-feed](assets/connect-feed.jpg)

I Copied the link Package Source URL in order to use it from Visual Studio for dowloading the package.

### Build Pipeline

Under Azure DevOps -> Pipelines -> Build, I createt a new pipeline, specifying the repository added above.

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

Main steps:

- The first DotNetCoreCLI@2 command build and pack the CRUD project, under the $(build.artifactStagingDirectory) folder.
- The second DotNetCoreCLI@2 command push the pack in the TeamFeed, previously created.
- the PublishBuildArtifacts@1 command pubish the artifact.

### Consume CRUD Package

From Visual Studio I went to Manage NuGet Packages...

![manage-nuget-packages](assets/manage-nuget-packages.jpg)

From Settings icon I added the source, copied before and I clicked Updated button

![add-crud-package](assets/add-crud-package.jpg)

Now it's possible to select my CRUD package, changing the Package source combobox selection near the Settings icon.