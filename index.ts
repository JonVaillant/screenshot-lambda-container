import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as puppeteer from 'puppeteer';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    // the `event` is the `body`
    const body = event as { [key: string]: any }

    if (!body.url) return {
        statusCode: 500,
        body: 'No URL provided'
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(body?.url);
    const screenshot = await page.screenshot({});

    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
            screenshot
        }),
    };
};
