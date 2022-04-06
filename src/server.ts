import { createContainer } from 'base/container.base';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import { AppSrv } from './app';
dotenv.config({ path: '.env' });

function registerProcessEvents(app: Application) {
  const port = Number(process.env.PORT) || 4000;
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
  process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (err: any) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
}

export async function initServer() {
  try {
    // Starting the HTTP server
    console.log('Starting HTTP server');
    const DB = process.env.DB_URL;
    const defaultOptions: mongoose.ConnectOptions = {
      minPoolSize: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    mongoose
      .connect(DB as string, defaultOptions)
      .then(() => console.log('DB connection successful!'));

    const container = createContainer();
    const app = new AppSrv(express(), container);
    registerProcessEvents(app.get());
  } catch (e) {
    console.error(e, 'An error occurred while initializing application.');
  }
}

initServer();
