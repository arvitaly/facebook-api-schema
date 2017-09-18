jest.mock("node-fetch");
import { start, stop } from "./../__mocks__/node-fetch";
beforeAll(async () => start());
afterAll(async () => stop());
import { GetAllNodes } from "./get-all-nodes";
import GetNodeList from "./node-list";
it("get all nodes", async () => {
    expect(await GetAllNodes({
        getNodeList: async () => (await GetNodeList()).filter((_, i) => i < 2),
    })()).toMatchSnapshot();
});
