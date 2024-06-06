import EasyStar from './libs/astar/easystar.min';
import CoordesUtils from "../../com/CoordesUtils";
import PqAstar from "./PqAstar";
const {ccclass,property}=cc._decorator;
@ccclass
export default class Test extends cc.Component {
    @property(cc.Camera)
    private cam:cc.Camera=null;
    @property(cc.Prefab)
    private grid:cc.Prefab=null;
    @property(cc.Node)
    private root:cc.Node=null;
    @property(cc.Node)
    private clickArea:cc.Node=null;
    @property(cc.Node)
    private tag:cc.Node=null;
    private gridData:number[][]=[];
    private gridMap:cc.Node[][]=[];
    private astar: any =null;
    private sideSize:number=100;
    protected onEnable(): void {
        for (let i = 0; i < this.sideSize;i++){
            this.gridData.push([]);
            for (let j = 0; j < this.sideSize;j++){
                this.gridData[i].push(Math.random()*5<=1?1:0);
            }
        }
        this.gridData[0][0]=0;
        for (let i: number = 0; i < this.gridData.length;i++){
            console.log(JSON.stringify(this.gridData[i]));
            for (let j: number = 0; j < this.gridData[i].length;j++){
                let nd = cc.instantiate(this.grid);
                nd.parent = this.root;
                if (this.gridMap[i] == null) this.gridMap[i] = [];
                this.gridMap[i].push(nd);
                nd.x = j * nd.width;
                nd.y = -i * nd.height;
                nd.color = this.gridData[i][j]==0?cc.Color.WHITE:cc.Color.BLACK;
            }
        }
        this.cam.zoomRatio=0.15;
        this.root.x = 0 - this.sideSize *50*0.5;
        this.root.y = this.sideSize *50*0.5;

        this.astar = new EasyStar.js();
        this.astar.setGrid(this.gridData);
        this.astar.setAcceptableTiles([0]);
        // this.astar.enableDiagonals();
        this.astar.setIterationsPerCalculation(1000);
        this.clickArea.on(cc.Node.EventType.TOUCH_END,this.onClick,this);
    }
    private onClick(e:cc.Event.EventTouch){
        console.log("点击寻路");
        let ep = e.getLocation();
        let wp:any = this.cam.getScreenToWorldPoint(ep);
        let lp=CoordesUtils.getSpacePos(wp,this.root);
        this.tag.x=lp.x;
        this.tag.y=lp.y;
        let x = Math.round(lp.x/50);
        let y = Math.round(-lp.y / 50);
        const start: [number, number] = [0, 0];
        const end: [number, number] = [x, y];
        let self=this;
        this.astar.findPath(start[0], start[1], end[0], end[1], function (path) {
            if (path === null) {
                console.log("Path was not found.");
            } else {
                console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
                for (const node of path) {
                    self.gridMap[node.y][node.x].color = cc.Color.RED;
                }
            }
        });
        this.astar.calculate();
    }
}