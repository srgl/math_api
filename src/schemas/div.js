export default {
  $id: 'div',
  type: 'object',
  required: [
    'a',
    'b',
  ],
  properties: {
    a: {
      type: 'number',
    },
    b: {
      type: 'number',
      oneOf: [
        {
          exclusiveMaximum: 0,
        },
        {
          exclusiveMinimum: 0,
        },
      ],
    },
  },
};
