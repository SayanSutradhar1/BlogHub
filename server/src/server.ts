import { Express, Router } from "express";
import express from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import cors from "cors";

/**
 * Application class for setting up and managing an Express server instance
 */
class Application {
  /** Port number for the server to listen on */
  port!: number;
  /** Name of the application */
  appName!: string;
  /** Express application instance */
  instance!: Express;
  /** HTTP Server instance */
  server!:Server<typeof IncomingMessage,typeof ServerResponse>

  /**
   * Creates an instance of Application
   * @param {number} port - The port number to run the server on
   * @param {string} appName - The name of the application
   */
  constructor(port: number, appName: string) {
    this.port = port;
    this.appName = appName;
  }

  /**
   * Initializes the Express application with JSON parsing and CORS configuration
   */
  init(){
    this.instance = express();
    this.instance.use(express.json())
    this.instance.use(cors({
        origin:["http://localhost:3000","https://13.203.167.206","https://blog-hub.strangled.net"],
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],
    }))
  }

  /**
   * Adds one or more Express routers to the application
   * @param {...Router[]} routers - Express Router instances to add
   */
  useRouter(...routers:{path:string,router:Router}[]){
    for (const router of routers) {
        this.instance.use('/api'+router.path,router.router)
    }
  }


  /**
   * Starts the server on the configured port
   * @param {Function} cb - Callback function to execute when server starts
   */
  start(cb: Function) {
    this.server = this.instance.listen(this.port, cb());
  }

  /**
   * Stops the server
   * @param {Function} cb - Callback function to execute when server stops
   */
  stop(cb:Function) {
    this.server.close(cb());
  } 
}

export default Application;
