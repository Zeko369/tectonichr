import express from "express";
import next from "next";
import { join } from "path";
import { main } from "./main";

const nextApp = next({ dev: false, dir: join(__dirname, "../../frontend") });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await nextApp.prepare();
    const server = express();

    // start backend
    await main(server);

    // start frontend
    server.all("*", (req, res) => handle(req, res));

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
