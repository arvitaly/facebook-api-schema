import URLLib = require("url");
import GrabModel, { attr, html, sel, text } from "webgrab";
import parseDescription from "./parse-description";
export const URL = `https://developers.facebook.com/docs/graph-api/reference`;
export const model = sel("h3 + div > table > tbody > tr", [{
    name: sel("td > a", {
        href: attr("href"),
        title: sel("code", text()),
    }),
    description: sel("td+td > p", html()),
}]);
export const Grab = ({ url = URL, grab = GrabModel }) => async () => {
    const raw = await grab(url, model);
    return raw;
};
export const grabRaw = Grab({});
export const GetNodeList = ({ grab = Grab({}) }) => async () => {
    const raw = await grab();
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
            link: URLLib.resolve(URL, rawNode.name.href),
            title: rawNode.name.title,
            description: parseDescription(rawNode.description || ""),
        };
    });
};
export default GetNodeList({});
