const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
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
        const patient = await axios.get(`http://localhost:8080/patients/${args.id}`);
        return patient.data;
      },
    },
    patients: {
      type: new GraphQLList(PatientType),
      async resolve(parentValue, args) {
        const patients = await axios.get('http://localhost:8080/patients');
        return patients.data;
      },
    },
  },
});

// Mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPatient: {
      type: PatientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parentValue, args){
        const newPatient = await axios.post('http://localhost:8080/patients', { ...args });
        return newPatient.data;
      },
    },
    deletePatient: {
      type: PatientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args){
        const patient = await axios.delete(`http://localhost:8080/patients/${args.id}`);
        return patient.data;
      },
    },
    updatePatient: {
      type: PatientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parentValue, args) {
        const patient = await axios.patch(`http://localhost:8080/patients/${args.id}`, args);
        return patient.data;
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});