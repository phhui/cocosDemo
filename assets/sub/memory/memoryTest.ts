const { ccclass, property } = cc._decorator;
@ccclass
export default class memoryTest extends cc.Component {
    private bundle: cc.AssetManager.Bundle = null;
    onLoad() {

    }
    loadRes(){
        console.log("加载资源");
        cc.assetManager.loadBundle("sub/memory/bigAsset", (err, bundle) => {
            if (err) {
                cc.error(err);
                return;
            }
            this.bundle = bundle;
            bundle.load("bigAsset", (err, pf) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                let nd=cc.instantiate(pf);
                this.node.getChildByName("root").addChild(nd);
            });
        });
    }
    closeRes(){
        this.node.getChildByName("root").removeAllChildren();
        this.bundle.releaseAll();
        this.bundle = null;
        console.log("释放资源");
    }
    releaseRes(){
        jsb.reflection.callStaticMethod("org.cocos2dx.javascript/AppActivity", "gc", "()V",);
    }
    //测试结果：启动后未加载资源时内存90-100M之间，加载10M(占用内存大小)的图片后内存升到120-130之间，释放后内存会回到110-120之间，这个20M可能是内存碎片或临时缓存等，无法恢复到100M以内
    //资源释放后大概10-20秒内存会释放回去，回到110-120这个节点，如果没有则说明资源有被引用导致未完全释放。测试了几次均无法恢复到初始的90-100M
    //加载10M的资源，内存会上升20-50M，图片解码会分配临时内存，特别是大图片。有时，框架或库会对同一图片进行多次解码，或者在内存中创建多个副本以供不同用途（如生成缩略图、缓存等）。这会导致内存使用增加。加载和释放大图片时，内存可能会变得碎片化，使得内存占用看起来比实际的图像大小要高。
}