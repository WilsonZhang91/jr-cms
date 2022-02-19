const app = require("./app");
const connectToDb = require("./utils/db");

const PORT = process.env.PORT || 3000;

connectToDb();

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
