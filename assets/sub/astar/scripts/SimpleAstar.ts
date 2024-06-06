interface Node {
    x: number;
    y: number;
    g: number; // 从起点到该节点的移动成本
    h: number; // 从该节点到目标的启发式估计成本
    f: number; // 总成本 g + h
    parent: Node | null;
}

function heuristic(a: Node, b: Node): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // 曼哈顿距离
}
export default class SimpleAstar {
    private static createNode(x: number, y: number, parent: Node | null = null): Node {
        return { x, y, g: 0, h: 0, f: 0, parent };
    }

    private static getNeighbors(node: Node, grid: number[][]): Node[] {
        const neighbors: Node[] = [];
        const directions = [
            { dx: 0, dy: -1 }, // 上
            { dx: 0, dy: 1 },  // 下
            { dx: -1, dy: 0 }, // 左
            { dx: 1, dy: 0 },  // 右
            { dx: -1, dy: -1 }, // 左上
            { dx: 1, dy: -1 }, // 右上
            { dx: -1, dy: 1 }, // 左下
            { dx: 1, dy: 1 }  // 右下
        ];

        for (const { dx, dy } of directions) {
            const x = node.x + dx;
            const y = node.y + dy;
            if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length && grid[y][x] === 0) {
                neighbors.push(SimpleAstar.createNode(x, y));
            }
        }
        return neighbors;
    }
    public static findPath(startPos: [number, number], endPos: [number, number], grid: number[][]): Node[] | null {
        const openList: Node[] = [];
        const closedList: Node[] = [];
        const startNode = SimpleAstar.createNode(startPos[0], startPos[1]);
        const endNode = SimpleAstar.createNode(endPos[0], endPos[1]);
        openList.push(startNode);
        while (openList.length > 0) {
            // 从开放列表中取出 f 值最小的节点
            openList.sort((a, b) => a.f - b.f);
            const currentNode = openList.shift() as Node;
            // 如果找到目标节点，重构路径
            if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
                const path: Node[] = [];
                let curr: Node | null = currentNode;
                while (curr) {
                    path.push(curr);
                    curr = curr.parent;
                }
                return path.reverse();
            }
            closedList.push(currentNode);
            const neighbors = SimpleAstar.getNeighbors(currentNode, grid);
            for (const neighbor of neighbors) {
                if (closedList.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    continue;
                }
                const tentativeG = currentNode.g + 1; // 假设移动成本为1
                if (!openList.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    neighbor.g = tentativeG;
                    neighbor.h = heuristic(neighbor, endNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = currentNode;
                    openList.push(neighbor);
                } else if (tentativeG < neighbor.g) {
                    neighbor.g = tentativeG;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = currentNode;
                }
            }
        }
        return null; // 没有找到路径
    }
}