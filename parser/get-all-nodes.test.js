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
jest.mock("node-fetch");
const node_fetch_1 = require("./../__mocks__/node-fetch");
beforeAll(() => __awaiter(this, void 0, void 0, function* () { return node_fetch_1.start(); }));
afterAll(() => __awaiter(this, void 0, void 0, function* () { return node_fetch_1.stop(); }));
const get_all_nodes_1 = require("./get-all-nodes");
const node_list_1 = require("./node-list");
it("get all nodes", () => __awaiter(this, void 0, void 0, function* () {
    expect(yield get_all_nodes_1.GetAllNodes({
        getNodeList: () => __awaiter(this, void 0, void 0, function* () { return (yield node_list_1.default()).filter((_, i) => i < 2); }),
    })()).toMatchSnapshot();
}));
