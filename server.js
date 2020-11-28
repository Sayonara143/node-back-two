import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { url, path, configServer } from './config'
import mongoose  from 'mongoose'
import  typeDefs  from './typeDefs/index'
import  resolvers  from './resolvers/index'


// const startServer = async () => {
  const app = express();
  mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true  },  () => {
    console.log("[MONGODB] connect")
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: false,
    context: ({ req }) => ({
      req,
      dataloaders: new WeakMap()
    }),
  });
  server.applyMiddleware({app});
  app.use(express.static('uploads'))
  app.listen(configServer, () => {
    console.log(`[SERVER] start at http://localhost:4000${server.graphqlPath}`)
  });
// }
// startServer();
 
