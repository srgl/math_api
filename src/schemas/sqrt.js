export default {
  $id: 'sqrt',
  type: 'object',
  required: [
    'data',
  ],
  properties: {
    data: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'number',
        minimum: 0,
      },
    },
  },
};
