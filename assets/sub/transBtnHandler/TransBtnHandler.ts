
const { ccclass, property } = cc._decorator;

@ccclass
export default class TransBtnHandler extends cc.Component {

    protected onLoad(): void {
        cc.director.getPhysicsManager().enabled = true;
        let self = this;
        let hitTest = function (point) {
            let locationInNode = this.convertToNodeSpaceAR(point);
            let collider = this.getComponent(cc.PhysicsPolygonCollider);
            if (collider && self.isPointInCollider(collider, locationInNode)) {
                return true;
            }
            return false;
        };
        ///@ts-ignore
        this.node._hitTest = hitTest;
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
}