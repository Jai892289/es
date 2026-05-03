import "dotenv/config";
console.log("DATABASE_URL:", process.env.DATABASE_URL);

import app from "./app";

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});