# Screenshot Service

Take a screenshot of a page of your choice using this standalone "serverless" function. This sort of thing is very useful because you can trigger as many of these independent functions as you need and their life-cycles last for as long as are needed to do their job. Finally some resources that can be relied upon! &mdash; and that is useful because it is performant and economical for your rare and infrequent scenario as well as the high demand usages or X-to-one targeted and amped up scenario. It also means you can keep website photography dependencies out of your other services.


## When Building

You want to specify the platform.

```cli
docker build --platform linux/amd64 -t snap .
```


## Lambda Usage

In an API request body
```json
{ "url": "url-of-page-to-screenshot" }
```

In another event
```json
{ "body": {"url": "url-of-page-to-screenshot" } }
```

## What are these Commented Out things in Dockerfile?

I made an attempt at properly installing the full binary of google-chrome for RHEL &mdash; an attempt that failed. Despite managing to install it, *we cannot use it,* as there are difficult to diagnose problems relating to trying to use a GPU in headless mode and not having a display server installed for head mode (head mode at some point supported `disable-gpu` flag). Ultimately after wasting an embarrassing amount of time I've given up and switched to using a prebuilt Chrome binary distributed as an NPM package titled "playwright-aws-lambda." Unfortunately that binary is outdated and updated by people who are not from Google. Fortunately it works now thanks to them.


## Resources

- [Playwright AWS Lambda package](https://github.com/JupiterOne/playwright-aws-lambda)
- [RedHat forum explaining Google Chrome installation](https://access.redhat.com/discussions/4406201)
- [Help: Flags don't work when headless](https://groups.google.com/g/chromedriver-users/c/62T8gnZWzd0?pli=1)
