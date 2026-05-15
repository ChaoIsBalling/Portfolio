export default class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,pool) { 
        super(scene,x,y,'bullet');
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        this.pool = pool;
        this.desviacion=0;
        this.y=y;   
        this.time=0;
    } 
    preUpdate(t,dt)
        {
            console.log(this.time)
            super.preUpdate(t, dt);
            this.body.setVelocityX(this.desviacion);
            this.body.setVelocityY((-80-this.time));
             if (this.y<=0)
             {
                this.destroyMe();
             }
        }

        destroyMe()
        {
            this.pool.release(this)
        }
}