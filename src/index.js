import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectToDB from "./db/connection.js";
import appRouter from "./routes.js";

async function main() {
  try {
    await connectToDB();
    console.info("Connection to Mongo established successfully");

    const PORT = process.env.PORT || 5000;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const staticPath = path.resolve(__dirname, "public");
    const app = express();

    app.use(express.json());

    app.use(
      express.static(staticPath, {
        extensions: ["html"],
      })
    );

    app.use("/api", appRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.error("Fatal error starting server, exiting...");
    console.error(e);
    process.exit(1);
  }
}

main();
