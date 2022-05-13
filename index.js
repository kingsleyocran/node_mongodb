const MongoClient = require("mongodb").MongoClient;

const dboper = require("./mongo_operations");
const assert = require("assert");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log("Connected correctly to server");

  const db = client.db(dbname);

  dboper.insertDocument(
    db,
    { name: "Vadonut", description: "Test" },
    "dishes",
    (result) => {
      console.log("Insert Document: ", {
        name: "Vadonut",
        description: "Test",
      });
      console.log();

      dboper.findDocuments(db, "dishes", (docs) => {
        console.log("Found Documents:\n", docs);
        console.log();

        dboper.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated Test" },
          "dishes",
          (result) => {
            console.log("Updated Document:\n", result.upsertedId);
            console.log();

            dboper.findDocuments(db, "dishes", (docs) => {
              console.log("Found Updated Documents:\n", docs);
              console.log();

              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection: ", result);
                console.log();

                client.close();
              });
            });
          }
        );
      });
    }
  );
});
