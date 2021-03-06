
const schema = {
  title: 'User Schema',
  description: 'Describes an User',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
};

export default {
  name: 'users',
  schema,
};
