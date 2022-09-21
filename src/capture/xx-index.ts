import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { CaptureOptions } from './types';

export const lambdaHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    const body = event?.body;

    // const userOptions: CaptureOptions = JSON.parse(body) as CaptureOptions;
    // const result = capture(userOptions);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `has body? ${!!body ? 'yes' : 'no'}`,
        }),
    };
};
