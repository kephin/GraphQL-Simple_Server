const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

// Patient Type
const PatientType = new GraphQLObjectType({
  name: 'Patient',
  fields() {
    return ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      age: { type: GraphQLInt },
    });
  },
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    patient: {
      type: PatientType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const patient = await axios.get(`http://localhost:3000/patients/${args.id}`);
        return patient.data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});