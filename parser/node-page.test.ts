jest.mock("node-fetch");
import { start, stop } from "./../__mocks__/node-fetch";
import getNode, { Grab as grabNodePage } from "./node-page";
beforeAll(async () => start());
afterAll(async () => stop());
it("grab from real html", async () => {
    expect(
        await grabNodePage({})("achievement"),
    ).toMatchSnapshot();
});
it("get node", async () => {
    expect(await getNode("achievement")).toMatchSnapshot();
});
