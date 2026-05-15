export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        this.dead = false;
        this.y = y;
        this.scene.anims.create({
            key: 'rotating',
            frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'death',
            frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 2 }),
            frameRate: 20,
            repeat: 2
        });
        this.anims.play('rotating', true);

        this.tween = this.scene.tweens.add({
            targets: this,
            x: { from: x - 30, to: x + 30 },
            ease: 'sine.inout',
            duration: 2000,
            delay: 50,
            repeat: -1,
            yoyo: true
        });
    }
    update() {
        if (!this.dead)
            this.body.setVelocityY(50);
        else
            this.body.setVelocityY(0);
        if (this.y > 376) {
            this.destroy();
        }
    }
    death() {
        var boom=this.scene.sound.add('Explosion')
        boom.play();
        this.tween.stop();
        this.anims.play('death', true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE,() => {this.destroy()});
        this.dead = true;
    }


}