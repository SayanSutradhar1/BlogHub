import mongoose from "mongoose";

export async function dbconnect() {

  const connection = await mongoose.connect(process.env.MONGO_URI as string, {
    dbName: process.env.DB_NAME,
  });

  if(connection.connection.readyState === 1){
    console.log("Database connected successfully",
      `${connection.connection.host}:${connection.connection.port}`)
  }

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


  return connection;
}
