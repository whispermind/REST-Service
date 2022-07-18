# Home Library Service

# RSSchool REST service task

## Installation

```
git clone https://github.com/whispermind/REST-Service.git
cd REST-Service
git checkout dev
npm install
```

Create `.env` file from `.env.example`

## Start

```bash
npm run start
```

This will start a server at `4000`(default) port and will be able to open
OpenAPI documentation at http://localhost:4000/doc/ and test functionality there.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all tests with authorization

```
npm run test:auth
```

To run a specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Check for linter errors

```
npm run lint
```
