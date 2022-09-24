# Screenshot Service

Take a screenshot of a page of your choice using this standalone "serverless" function.


## When Building

You want to specify the platform.

```cli
docker build --platform linux/amd64 -t snap .
```


## Lambda Usage

```json
{ "url": "url-of-page-to-screenshot" }
```

## Resources

- [RedHat forum explaining Google Chrome installation](https://access.redhat.com/discussions/4406201)
