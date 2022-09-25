import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { capture } from './capture';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    // Usually with requests the body is as you expect
    // for other events (as in test console), you'll need to add `"body":`
    if (!event.body) return {
        statusCode: 500,
        body: 'No body (event not from API? - add `body`)'
    }

    const body = JSON.parse(event.body)

    if (!body || !body.url) return {
        statusCode: 500,
        body: 'No URL provided'
    }

    const screenshot = await capture(body.url, true);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
            screenshot
        }),
    };
};
