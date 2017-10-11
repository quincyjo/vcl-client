[![Build Status](https://travis-ci.org/verbetam/vcl-client.svg?branch=master)](https://travis-ci.org/verbetam/vcl-client)
[![codecov](https://codecov.io/gh/verbetam/vcl-client/branch/master/graph/badge.svg)](https://codecov.io/gh/verbetam/vcl-client)
![documentation](./coverage-badge.svg)
# VCL Client

Client-side application for [Apache Virtual Computing Lab (VCL)](https://vcl.apache.org/).
Developed independently from the business server-side logic to interact with the developing API.
Contains an internal mock-backend following the API specifications for separated testing and development.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

When production mode is not enabled, MockBackendService is provided in place of Angular's HttpClient service.
This allows for development locally without the need to connect to the actual VCL API.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
When built with the `--environment=prod` flag is set, the application will instead provide HttpClient for deployment.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
The TestBed provides the MockBackendService in place of HttpClient.

## Documentation

Documentation can be generated using [CompoDoc](https://github.com/compodoc/compodoc) with the command `npm run compodoc`. The documentation is built in the `documentation/` directory.
