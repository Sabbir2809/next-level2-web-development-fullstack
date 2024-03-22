import app from "./app";

const port = 5000;
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
