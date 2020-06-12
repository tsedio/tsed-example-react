import {
  $log,
  GlobalAcceptMimesMiddleware,
  ServerLoader,
  ServerSettings,
  Configuration,
} from "@tsed/common";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: "./../config" });
import * as env from "env-var";
import "@tsed/typeorm";
import "reflect-metadata";

const rootDir = __dirname;
const clientDir = path.join(rootDir, "../../client/build");

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8081,
  httpsPort: false,
  logger: {
    debug: true,
    logRequest: false,
    requestFields: [
      "reqId",
      "method",
      "url",
      "headers",
      "query",
      "params",
      "duration",
    ],
  },
  mount: {
    "/rest": [
      `${rootDir}/controllers/**/*.ts`, // Automatic Import, /!\ doesn"t works with webpack/jest, use  require.context() or manual import instead
    ],
  },
  componentsScan: [
    "${rootDir}/middlewares/**/*.ts",
    "${rootDir}/services/**/*.ts",
    "${rootDir}/converters/**/*.ts",
    "${rootDir}/repositories/**/*.ts",
  ],
  swagger: [
    {
      path: "/api-docs",
    },
  ],
  calendar: {
    token: true,
  },
  statics: {
    "/": clientDir,
  },
  typeorm: [
    {
      name: "default",
      type: "mssql",
      host: "localhost",
      port: 1433,
      username: "USERNAME",
      password: "PASSWORd",
      database: "DB_NAME",
      entities: [`${rootDir}/entities/*{.ts,.js}`],
      migrations: [`${rootDir}/migrations/*{.ts,.js}`],
      subscribers: [`${rootDir}/subscribers/*{.ts,.js}`],
    },
  ],
})
export class Server extends ServerLoader {
  constructor(settings) {
    super(settings);
  }

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $beforeRoutesInit(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );

    return null;
  }

  $afterRoutesInit() {
    this.expressApp.get(`*`, (req, res) => {
      res.sendFile(path.join(clientDir, "index.html"));
    });
  }
}
