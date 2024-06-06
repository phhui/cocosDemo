// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class alphaClick extends cc.Component {
    @property(cc.Node)
    private btn1: cc.Node = null;
    @property(cc.Node)
    private btn2: cc.Node = null;
    @property(cc.Node)
    private btn3: cc.Node = null;
    @property(cc.Node)
    private btn4: cc.Node = null;
    @property(cc.Node)
    private btn5: cc.Node = null;

    private pressPos:cc.Vec2=null;
    private itemPos:cc.Vec2=null;
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        let self=this;
        let hitTest = function (point) {
            let locationInNode = this.convertToNodeSpaceAR(point);
            let collider = this.getComponent(cc.PhysicsPolygonCollider);
            if (collider && self.isPointInCollider(collider, locationInNode)) {
                return true;
            }
            return false;
        };
        this.btn1._hitTest = hitTest;
        this.btn2._hitTest = hitTest;
        this.btn3._hitTest = hitTest;
        this.btn4._hitTest = hitTest;
        this.btn5._hitTest = hitTest;
        this.btn1.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn2.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn3.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn4.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn5.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
    }
    private isPointInCollider(collider, point) {
        let points = collider.points;
        let inside = false;

        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            let xi = points[i].x, yi = points[i].y;
            let xj = points[j].x, yj = points[j].y;

            let intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }
    private onTouch(e){
        let button=e.target;
        let locationInNode = button.convertToNodeSpaceAR(e.getLocation());

        // 获取按钮的 PhysicsPolygonCollider 组件
        let collider = button.getComponent(cc.PhysicsPolygonCollider);
        if (collider && this.isPointInCollider(collider, locationInNode)) {
            // 触发按钮点击事件
            button.emit('click');
        }
    }
    private onTouchStart(e) {
        console.log("点击了", e.target.name);
        this.pressPos=e.getLocation();
        this.itemPos=e.target.getPosition();
        e.target.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        e.target.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    private onTouchMove(e) {
        e.target.setPosition(this.itemPos.x+e.getLocation().x-this.pressPos.x,this.itemPos.y+e.getLocation().y-this.pressPos.y);
    }
    private onTouchEnd(e) {
        e.target.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        e.target.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    start () {

    }

    // update (dt) {}
}
