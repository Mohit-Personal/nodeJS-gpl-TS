import 'reflect-metadata';
import {ApolloServer} from "apollo-server-express";
import express from "express";
import {buildSchema} from 'type-graphql'
import { TodoResolver } from './resolvers/todoResolver';
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import  mongoose from "mongoose"
var configData = require("./config/connection");

const main = async() => {
    const schema = await buildSchema({
        resolvers: [TodoResolver],
        emitSchemaFile: true,
        validate: false
    })

    const app = express()

    //Create AolloServer
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    })
    await server.start()
    server.applyMiddleware({app})

    // Connect to db
    let connectionInfo = await configData.getConnectionInfo();

    mongoose.connect(connectionInfo.DATABASE_URL).then(() => {
        console.log("connected to db")
    }).catch((err) => {
        console.log(err)
    })

    app.listen(4000, () => {
        console.log('Server is running on http://localhost:4000/graphql')
    })
}

main()

