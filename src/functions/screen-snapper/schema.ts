export default {
  type: "object",
  properties: {
    url: { type: 'string' },
    capture: { type: 'string' },
    selector: { type: 'string' },
    puppeteer: {
      type: 'object',
      properties: {
        viewport: {
          type: 'object',
          properties: {
            width: { type: 'string' },
            height: { type: 'string' }
          }
        },
        screenshot: {
          type: 'object',
          properties: {
            omitBackground: { type: 'boolean' },
            quality: { type: 'string' },
            type: { type: 'string' }
          }
        }
      }
    }
  },
  required: ['url']
} as const;
