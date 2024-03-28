import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 5000;
let server: Server;

// main server
async function main() {
  try {
    server = app.listen(port, () => {
      console.log(`Server is ready at: http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Server Error:", error);
  }
}
main();
