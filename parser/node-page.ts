import URLLib = require("url");
import GrabModel, { attr, html, sel, text } from "webgrab";
import parseDescription from "./parse-description";
export const URL = (name: string, version = "2.10") =>
    `https://developers.facebook.com/docs/graph-api/reference/v${version}/${name}`;
export const Grab = ({ url = URL, grabModel = GrabModel }) => async (name: string, version?: string) => {
    const u = url(name.toLowerCase(), version);
    const raw = await grabModel(u, {
        description: sel("h1+p", html()),
        readingPermissions: sel("#readperms + ul > li", [html()]),
        fields: sel("#fields + div > table > tbody > tr", [{
            name: sel("td > p", html()),
            description: sel("td+td > p", html()),
            type: sel("td+td+td > p", html()),
        }]),
        edges: sel("#edges + div > table > tbody", [{
            name: sel("td > p > a", {
                href: attr("href"),
                title: sel("code", text()),
            }),
            description: sel("td+td > p", html()),
        }]),
    });
    return {
        raw,
        url: u,
    };
};
export const grab = Grab({});
export const GetNode = ({ grabRaw = grab }) => async (name: string) => {
    const { raw, url } = await grabRaw(name);
    if (!raw) {
        throw new Error("Not found raw info");
    }

    return {
        description: parseDescription(raw.description || ""),
        edges: raw.edges ? raw.edges.map((edge) => {
            if (!edge.name) {
                throw new Error("Not found name for edge" + edge);
            }
            return {
                link: URLLib.resolve(url, edge.name.href),
                title: (edge.description || " ").substr(1),
            };
        }) : [],
        readingPermissions: raw.readingPermissions ? raw.readingPermissions.map((p) => parseDescription(p)) : [],
    };
};
export default GetNode({});
