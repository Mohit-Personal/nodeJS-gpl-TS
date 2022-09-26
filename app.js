const express = require("express");
const PORT = 8080;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const configData = require("./config/connection");

const main = async () => {
  const app = express();

  // const staticPath = path.join(__dirname, '/public');
  // app.use(express.static(staticPath));

  //Allow Access-origin
  app.use(cors());

  // connect to mogodb
  let connectionInfo = await configData.getConnectionInfo();
  // const dbURI =
  //   "mongodb+srv://mohit-mindstix:mindstix@gql-nodejs.79n3ok0.mongodb.net/?retryWrites=true&w=majority";
  mongoose
    .connect(connectionInfo.DATABASE_URL)
    .then((result) => console.log("connected to db"))
    .catch((err) => console.log(err));

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.get("/", (req, res) => {
    res.send("<h1> Hello Welcome to Mindstix! </h1>"); // For single line text
  });

  app.listen(PORT, function () {
    console.log("listening On Port No", PORT);
  });
};

main();
