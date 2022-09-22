# Screenshot Service

Take a screenshot of a page of your choice using this standalone "serverless" function.


## Setup

- Install dependencies
    - `yarn`
- Deploy
    `serverless deploy`


## Usage

- Make a request to the configured endpoint with the parameters as defined in the schema.


## Testing

### Testing Locally

Pass the mock request when invoking:

```cli
yarn sls invoke local -f screenSnapper --path src/functions/screen-snapper/mock.json
```

You can also test the serverless example project for comparison:

```cli
yarn sls invoke local -f hello --path src/functions/hello/mock.json
```

