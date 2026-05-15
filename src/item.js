export default class item extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y) {
        super(scene,x,y,'item');
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        this.y=y;
        this.scene.tweens.add({
            targets: this,
            rotation: -1.2,
            ease: 'sine.inout',
            duration: 2000,
            delay: 50,
            repeat: -1,
            yoyo: true
        });
    }
    update()
    {
        this.body.setVelocityY(20);
        if (this.y > 376) {
            this.destroy();
        }
    }
}