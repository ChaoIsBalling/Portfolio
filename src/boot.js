export default class Boot extends Phaser.Scene
{
    constructor(){
        super({key: "Boot"});
    }
    preload()
    {
        //IMAGES
        this.load.image('bgContrast', 'assets/images/background_hcontrast.png');
        this.load.image('bg','assets/images/background.png');
        this.load.image('bullet','assets/images/bullet.png');
        this.load.spritesheet('enemy','assets/images/enemy.png',{ frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('explosion','assets/images/explosion.png',{ frameWidth: 16, frameHeight: 16});
        this.load.image('item','assets/images/green.png');
        this.load.spritesheet('player','assets/images/twinbee.png',{ frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('player2','assets/images/winbee.png',{ frameWidth: 16, frameHeight: 16});

        //SOUNDS
        this.load.audio('dead', 'assets/sounds/dead.wav'); 
        this.load.audio('Explosion','assets/sounds/explosion.wav');
        this.load.audio('lucky','assets/sounds/lucky.wav');
        this.load.audio('shoot','assets/sounds/shoot.wav');

    }
    create()
    {
        this.anims.create({
            key: 'enemyMove',
            frames:  this.anims.generateFrameNames('enemy', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'boom',
            frames:  this.anims.generateFrameNames('explosion', { start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.start("Title");
    }
}