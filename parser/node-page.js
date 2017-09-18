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
exports.URL = (name, version = "2.10") => `https://developers.facebook.com/docs/graph-api/reference/v${version}/${name}`;
exports.Grab = ({ url = exports.URL, grabModel = webgrab_1.default }) => (name, version) => __awaiter(this, void 0, void 0, function* () {
    const u = url(name.toLowerCase(), version);
    const raw = yield grabModel(u, {
        description: webgrab_1.sel("h1+p", webgrab_1.html()),
        readingPermissions: webgrab_1.sel("#readperms + ul > li", [webgrab_1.html()]),
        fields: webgrab_1.sel("#fields + div > table > tbody > tr", [{
                name: webgrab_1.sel("td > p code", webgrab_1.text()),
                description: webgrab_1.sel("td+td > p", webgrab_1.html()),
                type: webgrab_1.sel("td+td+td > p", {
                    scalar: webgrab_1.sel("code", webgrab_1.text()),
                    object: webgrab_1.sel("a ", {
                        link: webgrab_1.attr("href"),
                        title: webgrab_1.sel("code", webgrab_1.text()),
                    }),
                }),
            }]),
        edges: webgrab_1.sel("#edges + div > table > tbody", [{
                name: webgrab_1.sel("td > p > a", {
                    href: webgrab_1.attr("href"),
                    title: webgrab_1.sel("code", webgrab_1.text()),
                }),
                description: webgrab_1.sel("td+td > p", webgrab_1.html()),
            }]),
    });
    return {
        raw,
        url: u,
    };
});
exports.grab = exports.Grab({});
exports.GetNode = ({ grabRaw = exports.grab }) => (name) => __awaiter(this, void 0, void 0, function* () {
    const { raw, url } = yield grabRaw(name);
    if (!raw) {
        throw new Error("Not found raw info");
    }
    return {
        description: parse_description_1.default(raw.description || ""),
        edges: raw.edges ? raw.edges.map((edge) => {
            if (!edge.name) {
                throw new Error("Not found name for edge" + edge);
            }
            return {
                link: URLLib.resolve(url, edge.name.href),
                title: edge.description || "",
            };
        }) : [],
        readingFields: raw.fields ? raw.fields.map((rawField) => ({
            name: rawField.name || "",
            description: rawField.description ? parse_description_1.default(rawField.description) : "",
            type: rawField.type ? {
                scalar: rawField.type.scalar,
                object: rawField.type.object ? {
                    link: URLLib.resolve(url, rawField.type.object.link),
                    title: rawField.type.object.title,
                } : null,
            } : null,
        })) : [],
        readingPermissions: raw.readingPermissions ? raw.readingPermissions.map((p) => parse_description_1.default(p)) : [],
    };
});
exports.default = exports.GetNode({});
