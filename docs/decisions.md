# Technical and Architectural decisions

This document lists technical and architectural decisions, improvements that can be made and areas that will require further analysis.

## Providers integration

To have a more robust integration with the providers and support more workload, some actions can be taken:

- **High demand scenarios:** instead of being a synchronous API, a queing system could be implemented. This will enable the following scenarios:
  - emails could be sent by batch. The providers have APIs for that.
  - the providers usually have rate-limit mechanisms, so a request throtling could be implemented
- **Circuit breaker:** to better handle providers errors and switching between them, a proper tool to implement a circuit breaker should be used. This tool should give us a way to define error thresholds, monitor the current state and switch it manually if needed.

## Email handling

- **Normalization:** to better track the recipients, the email addresses could be normalized: lowercase, remove dots, etc
- **Reprocessing:** if an email could not be sent with any of the providers, a process could be run to reprocess them later.
- Improve _HTML -> Plain text_ conversion. I used some regex to make it simple but I would evaluate some libraries.

## API

- _Versioning:_ Implement API versioning to support multiple versions if needed
- _Documentation:_ The API was documented with OpenAPI but more details should be added

## Security

No security mechanism was included. If the service has to be exposed to the public, a **JWT token** could be used to identify the user. If the service is internal, a simple token could be used.

## Status endpoints

- Health check should do more checks like testing the database connection. It can be used as a **readiness check** for **Kubernetes**
- If the service is exposed to the public, these endpoints should be protected.

## Logging

- Traceability could be improved by generate unique request id
- RAW HTTP requests / responses could be logged using an external tool like AWS XRay or **Istio** in a service mesh architecture.
- Environments other than DEV log in JSON format to be easily parsed by a log collection mechanism. Further work should be done to add additional fields to the JSON that may be queried frequently or tracked in reports.

## Cors

If the API is consumed by a browser, the CORS headers should be setup.

## Docker

Docker was used to easily setup a local environment to run the app, but it's not building a NodeJS image like it should for distributing. It only runs the built code in `/dist`.

## Code style and commit messages

Some tools could be added to enforce a consistent code style, commit messages and linting:

- [husky](https://github.com/typicode/husky)
- [commitlint](https://github.com/conventional-changelog/commitlint)
- [lint-staged](https://github.com/okonet/lint-staged)
- [prettier](https://prettier.io/)

## Testing

- unit testing should be added
- more integration testing should be added

## Assumptions

- The email API only sends emails to only one recipient
