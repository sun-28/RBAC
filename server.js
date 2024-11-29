require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/db");

const PORT = process.env.PORT || 3000;

connectDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
