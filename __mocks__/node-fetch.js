"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const freeport_es6_1 = require("freeport-es6");
const fetch = require.requireActual("node-fetch").default;
const URLLib = require("url");
let port;
let server;
exports.start = jest.fn().mockImplementation(() => __awaiter(this, void 0, void 0, function* () {
    port = yield freeport_es6_1.default();
    const app = express();
    app.use(express.static(__dirname + "/../__fixtures__/urls"));
    return new Promise((resolve, reject) => {
        server = app.listen(port, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}));
exports.stop = jest.fn().mockImplementation(() => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}));
exports.default = jest.fn().mockImplementation((url, params) => {
    const u = URLLib.parse(url);
    u.host = `127.0.0.1:${port}`;
    u.protocol = "http";
    u.pathname = u.pathname + "/index.html";
    const newUrl = URLLib.format(u);
    return fetch(newUrl, params);
});
