import app from "./app";
import config from "./app/config";

const port = config.port || 4000;
async function server() {
  try {
    app.listen(port, () => {
      console.log(`Server is Running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
server();
