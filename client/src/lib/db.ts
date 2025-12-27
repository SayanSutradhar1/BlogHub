import mongoose from "mongoose";

const connectionStatus: { isConnected?: boolean } = {};

export async function dbconnect() {
  if (connectionStatus.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: process.env.DB_NAME,
    });

    console.log("Database connected successfully")

    connectionStatus.isConnected = connection.connection.readyState === 1;

    connection.connection.on("connected", () => {
      console.log(
        "Database connected successfully",
        `${connection.connection.host}:${connection.connection.port}`
      );
    });

    connection.connection.on("error", (err) => {
      console.log("Database connection error", err);
    });

    connection.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });
  } catch (error) {
    console.log("Database connection error", error);
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }
}
