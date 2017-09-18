import GetNodeList from "./node-list";
import GetNode from "./node-page";
export const GetAllNodes = ({ getNode = GetNode, getNodeList = GetNodeList }) => async () => {
    const nodes = await getNodeList();
    return await Promise.all(nodes.map(async (n) => {
        const data = { ...n, data: await getNode(n.name) };
        return data;
    }));
};

export default GetAllNodes({});
