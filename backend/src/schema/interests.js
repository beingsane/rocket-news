module.exports  = {
    title: 'interest schema',
    description: 'describes a simple hero',
    version: 0,
    type: 'object',
    properties: {
        platform: {
            type: 'string',
            index: true
        },
        type: {
            type: 'string',
            enum: ['account', 'keyword']
        },
        lastCrawlTime: {
            type: 'number',
            min: 1514684095
        },
        value: {
            type: 'string'
        }
    },
    required: ['platform', 'type', 'value']
};
