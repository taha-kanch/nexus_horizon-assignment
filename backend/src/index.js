const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');
const sequelize = require('./db');
require('./models');
require('dotenv').config();

(async () => {

    const app = express();
    const port = process.env.PORT;
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    await sequelize.sync({ force: false });
    console.log('Database synced');

    app.listen(port, (err) => {
        if (err) return console.log(`Error: ${err}`);
        console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
    });

})();
