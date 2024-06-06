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
        this.btn1.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn2.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn3.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn4.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn5.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
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
