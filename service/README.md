# Service

## API

The API definition can be found [here](https://github.com/fawind/notes/blob/master/service/src/main/java/api/NotesService.java).

## Setup

1. Setup Gradle: `gradle wrapper --gradle-version 3.3`
2. Install Google Cloud SDK: [cloud.google.com](https://cloud.google.com/sdk/docs/)
3. Install the Java App Engine components: `gcloud components install app-engine-java`
4. Run the dev server: `gradle appengineRun`

## Deploy

1. Verify your Google Cloud Project is setup correctly: `gcloud config list`
2. Deploy the service: `gradle appengineDeploy`
3. Optional: Update the datastore indices: `gcloud datastore create-indexes ./build/staged-app/WEB-INF/appengine-generated/index.yaml`
