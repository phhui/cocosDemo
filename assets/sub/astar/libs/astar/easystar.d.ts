// assets/libs/astar/easystar.d.ts
declare module '../libs/astar/easystar.min' {
    export class EasyStar {
        constructor();
        js(): EasyStarInstance;
    }

    /**
     * EasyStar 寻路实例的接口。
     */
    export interface EasyStarInstance {
        /**
         * 设置可接受的移动瓦片。
         * @param tiles - 可接受的瓦片编号数组或单个瓦片编号。
         */
        setAcceptableTiles(tiles: number[] | number): void;
        /**启用同步路径计算。*/
        enableSync(): void;
        /**禁用同步路径计算。*/
        disableSync(): void;
        /**启用对角线移动。*/
        enableDiagonals(): void;
        /**禁用对角线移动。*/
        disableDiagonals(): void;
        /**
         * 设置用于寻路的网格。
         * @param grid - 表示网格的二维数组。
         */
        setGrid(grid: number[][]): void;
        /**
         * 设置特定瓦片类型的成本。
         * @param tileType - 瓦片类型。
         * @param cost - 与瓦片类型关联的成本。
         */
        setTileCost(tileType: number, cost: number): void;
        /**
         * 在特定坐标设置额外的点成本。
         * @param x - x 坐标。
         * @param y - y 坐标。
         * @param cost - 额外的成本。
         */
        setAdditionalPointCost(x: number, y: number, cost: number): void;
        /**
         * 移除特定坐标的额外点成本。
         * @param x - x 坐标。
         * @param y - y 坐标。
         */
        removeAdditionalPointCost(x: number, y: number): void;
        /**
         * 移除所有额外点成本。
         */
        removeAllAdditionalPointCosts(): void;
        /**
         * 设置每次计算的迭代次数。
         * @param iterations - 迭代次数。
         */
        setIterationsPerCalculation(iterations: number): void;
        /**
         * 添加需要在寻路中避免的点。
         * @param x - x 坐标。
         * @param y - y 坐标。
         */
        avoidAdditionalPoint(x: number, y: number): void;
        /**
         * 停止避免特定点。
         * @param x - x 坐标。
         * @param y - y 坐标。
         */
        stopAvoidingAdditionalPoint(x: number, y: number): void;
        /**
         * 启用寻路中的切角。
         */
        enableCornerCutting(): void;
        /**
         * 禁用寻路中的切角。
         */
        disableCornerCutting(): void;
        /**
         * 停止避免所有额外点。
         */
        stopAvoidingAllAdditionalPoints(): void;
        /**
         * 寻找从起点到终点的路径。
         * @param startX - 起点的 x 坐标。
         * @param startY - 起点的 y 坐标。
         * @param endX - 终点的 x 坐标。
         * @param endY - 终点的 y 坐标。
         * @param callback - 回调函数，接收路径（坐标数组）。
         * @returns 唯一路径 ID。
         */
        findPath(startX: number, startY: number, endX: number, endY: number, callback: (path: { x: number, y: number }[]) => void): number;
        /**
         * 取消路径计算。
         * @param instanceId - 唯一路径 ID。
         * @returns 一个布尔值，指示路径是否成功取消。
         */
        cancelPath(instanceId: number): boolean;
        /**
         * 执行路径计算。
         */
        calculate(): void;
        /**
         * 在特定坐标设置方向条件。
         * @param x - x 坐标。
         * @param y - y 坐标。
         * @param allowedDirections - 允许的方向数组。
         */
        setDirectionalCondition(x: number, y: number, allowedDirections: EasyStar.Direction[]): void;
        /**
         * 移除所有方向条件。
         */
        removeAllDirectionalConditions(): void;
    }


    export namespace EasyStar {
        export enum Direction {
            TOP,
            TOP_RIGHT,
            RIGHT,
            BOTTOM_RIGHT,
            BOTTOM,
            BOTTOM_LEFT,
            LEFT,
            TOP_LEFT
        }
    }
}
