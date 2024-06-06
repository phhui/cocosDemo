// assets/libs/astar/easystar.d.ts
declare module '../libs/astar/easystar.min' {
    export class EasyStar {
        constructor();
        js(): EasyStarInstance;
    }

    export interface EasyStarInstance {
        setAcceptableTiles(tiles: number[] | number): void;
        enableSync(): void;
        disableSync(): void;
        enableDiagonals(): void;
        disableDiagonals(): void;
        setGrid(grid: number[][]): void;
        setTileCost(tileType: number, cost: number): void;
        setAdditionalPointCost(x: number, y: number, cost: number): void;
        removeAdditionalPointCost(x: number, y: number): void;
        removeAllAdditionalPointCosts(): void;
        setIterationsPerCalculation(iterations: number): void;
        avoidAdditionalPoint(x: number, y: number): void;
        stopAvoidingAdditionalPoint(x: number, y: number): void;
        enableCornerCutting(): void;
        disableCornerCutting(): void;
        stopAvoidingAllAdditionalPoints(): void;
        findPath(startX: number, startY: number, endX: number, endY: number, callback: (path: { x: number, y: number }[]) => void): number;
        cancelPath(instanceId: number): boolean;
        calculate(): void;
        setDirectionalCondition(x: number, y: number, allowedDirections: EasyStar.Direction[]): void;
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
