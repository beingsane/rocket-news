const schema = {
  title: 'news schema',
  description: 'describes a simple hero',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    interest: {
      type: 'string',
      rel: 'interests',
    },
    title: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    date: {
      type: 'number',
      min: 1514684095,
    },
    text: {
      type: 'string',
    },
  },
  required: ['interest', 'title', 'url', 'date'],
};

export default schema;
