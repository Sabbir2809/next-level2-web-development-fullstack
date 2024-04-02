import app from "./app";
import config from "./app/config";

const port = config.port || 3000;
let server;

// main server setup
async function main() {
  try {
    server = app.listen(port, () => {
      console.log(`Server is Running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Server Error:", error);
  }
}
main();
