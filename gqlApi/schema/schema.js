const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
    clients: { type: new GraphQLList(UserType) },
    isArtist: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: {type: GraphQLID} },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/api/accounts/${args.id}`)
          .then((response) =>  response.data )
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    userSignup: {
      type: UserType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        avatar: { type: GraphQLString },
        isArtist: { type: GraphQLBoolean }
      },
      resolve(parentValue, { first_name, last_name, email, password, avatar, isArtist}) {
        return axios.post(`http://localhost:3000/api/signup`, { first_name, last_name, email, password, avatar, isArtist })
          .then(response => response.data)
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
