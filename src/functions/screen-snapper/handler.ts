import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { capture } from 'src/capture/capture';
import { CaptureOptions } from 'src/capture/types';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const userOptions: CaptureOptions = event?.body as CaptureOptions
  const result = await capture(userOptions)

  return formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world! This will be screen snapper next. ${result}`,
    event,
  });
};

export const main = middyfy(hello);
