jest.mock("node-fetch");
import { start, stop } from "./../__mocks__/node-fetch";
beforeAll(async () => start());
afterAll(async () => stop());
import getList, { Grab as GrabNodeList } from "./node-list";
it("grab from real html", async () => {
    expect(
        await GrabNodeList({})(),
    ).toMatchSnapshot();
});
it("getList", async () => {
    expect(await getList()).toMatchSnapshot();
});
