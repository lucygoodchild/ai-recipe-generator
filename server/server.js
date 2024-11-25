// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// process.on("uncaughtException", (err) => {
//   console.log(err);
//   process.exit(1);
// });

// dotenv.config({ path: "../.env" });
// const app = require("./app");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB).then((connection) => {
//   console.log(connection.connections);
// });

// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {
//   console.log(`app running on port ${port}`);
// });

// process.on("unhandledRejection", (err) => {
//   console.log(err);
//   server.close(() => process.exit(1));
// });

import path from 'path';
import next from 'next';
import nextBuild from 'next/dist/build';
import express from 'express';
import payload from 'payload';
import { config as dotenv } from 'dotenv';

dotenv();

const dev = process.env.NODE_ENV !== 'production';
const server = express();

const start = async () => {
  await payload.init({
    express: server,
  });

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev });

    const nextHandler = nextApp.getRequestHandler();

    server.get('*', (req, res) => nextHandler(req, res));

    nextApp.prepare().then(() => {
      console.log('Next.js started');

      server.listen(process.env.PORT, async () => {
        console.log(`Server listening on ${process.env.PORT}...`);
      });
    });
  } else {
    server.listen(process.env.PORT, async () => {
      console.log('Next.js is now building...');
      await nextBuild(path.join(__dirname, '../'));
      process.exit();
    });
  }
};

start();