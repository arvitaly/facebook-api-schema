import express = require("express");
import freeport from "freeport-es6";
import { Server } from "http";
const fetch = require.requireActual("node-fetch").default;
import URLLib = require("url");
let port: number;
let server: Server;
export const start = jest.fn().mockImplementation(async () => {
    port = await freeport();
    const app = express();
    app.use(express.static(__dirname + "/../__fixtures__/urls"));
    return new Promise((resolve, reject) => {
        server = app.listen(port, (err: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
});
export const stop = jest.fn().mockImplementation(async () => {
    return new Promise((resolve, reject) => {
        server.close((err: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
});
export default jest.fn().mockImplementation((url: string, params: any) => {
    const u = URLLib.parse(url);
    u.host = `127.0.0.1:${port}`;
    u.protocol = "http";
    u.pathname = u.pathname + "/index.html";
    const newUrl = URLLib.format(u);
    return fetch(newUrl, params);
});
