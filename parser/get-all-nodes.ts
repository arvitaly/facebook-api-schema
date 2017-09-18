import getNodeList from "./node-list";
import getNode from "./node-page";
export const getAllNodes = () => async () => {
    const nodes = await getNodeList();
    nodes.map(()=> getNode() )
};
