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
const node_list_1 = require("./node-list");
const node_page_1 = require("./node-page");
exports.GetAllNodes = ({ getNode = node_page_1.default, getNodeList = node_list_1.default }) => () => __awaiter(this, void 0, void 0, function* () {
    const nodes = yield getNodeList();
    return yield Promise.all(nodes.map((n) => __awaiter(this, void 0, void 0, function* () {
        const data = Object.assign({}, n, { data: yield getNode(n.name) });
        return data;
    })));
});
exports.default = exports.GetAllNodes({});
