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
const URLLib = require("url");
const webgrab_1 = require("webgrab");
const parse_description_1 = require("./parse-description");
exports.URL = `https://developers.facebook.com/docs/graph-api/reference`;
exports.model = webgrab_1.sel("h3 + div > table > tbody > tr", [{
        name: webgrab_1.sel("td > a", {
            href: webgrab_1.attr("href"),
            title: webgrab_1.sel("code", webgrab_1.text()),
        }),
        description: webgrab_1.sel("td+td > p", webgrab_1.html()),
    }]);
exports.Grab = ({ url = exports.URL, grab = webgrab_1.default }) => () => __awaiter(this, void 0, void 0, function* () {
    const raw = yield grab(url, exports.model);
    return raw;
});
exports.grabRaw = exports.Grab({});
exports.getList = ({ grab = exports.Grab({}) }) => () => __awaiter(this, void 0, void 0, function* () {
    const raw = yield grab();
    if (!raw) {
        throw new Error("Not found raw info");
    }
    return raw.map((rawNode) => {
        if (!rawNode.name) {
            throw new Error("Not found name for node " + rawNode);
        }
        const matches = rawNode.name.href.match(/([^\/]+)$/gi);
        if (!matches) {
            throw new Error("Not found name in link " + rawNode.name.href);
        }
        return {
            name: matches[0],
            link: URLLib.resolve(exports.URL, rawNode.name.href),
            title: rawNode.name.title,
            description: parse_description_1.default(rawNode.description || ""),
        };
    });
});
exports.default = exports.getList({});
