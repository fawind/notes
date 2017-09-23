# [Notes](https://md-note.appspot.com) [![Build Status](https://travis-ci.com/fawind/notes.svg?token=RTEhNHKreGSnaC3U1jh2&branch=master)](https://travis-ci.com/fawind/notes)

App for writing "wysiwyg" markdown notes. Try it out [here](https://md-note.appspot.com/)!

<p align="center">
  <img src="https://user-images.githubusercontent.com/7422050/30777310-ffdd3c2c-a0b7-11e7-8759-21b9dd47eb31.png" width="600" alt="App Preview"/>
</p>

# Project Structure

**[Service:](https://github.com/fawind/notes/tree/master/service)**

JAX-RS server to be deployed on the [Google App Engine](https://cloud.google.com/appengine/docs/java) using the [Datastore](https://cloud.google.com/datastore/docs/concepts/overview) as a storage.

**[Web App:](https://github.com/fawind/notes/tree/master/app)**

Typescript-React-Redux app. The editor is based on [CodeMirror](https://github.com/codemirror/CodeMirror). The Typescript http bridge is automatically generated from the JAX-RS service interface.

# Setup

More information in the [app](https://github.com/fawind/notes/blob/master/app/README.md) and [service](https://github.com/fawind/notes/blob/master/service/README.md) readmes.

1. Install dependencies and build project: `make install`
2. Run tests: `make test`
3. Run the service `make runService`
4. Run the frontend dev server `make runApp`
5. Deploy application: `make deploy`
