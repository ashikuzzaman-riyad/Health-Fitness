// src/server.ts
import app from "./app";
import "dotenv/config";

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
