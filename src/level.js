import Player from "./player.js";
import Enemy from "./enemy.js";
import item from "./item.js";
import Bullet from "./bullet.js";
import Pool from "./pool.js";
export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: "Level" });
        this.enemyTime = 1000;
        this.itemTime = 2000;
        this.transitionTime = 500;
        this.levelEnded = false;
        this.win = false;
    }
    init(data) {
        console.log('init', data);

        this.multiplayer = data.multiplayer;
    }
    create() {
        this.physics.world.drawDebug = false;
        this.toggleDebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.bg = this.add.image(0, -1160, 'bg').setOrigin(0);

        var tween = this.tweens.add(
            {
                targets: this.bg,
                y: +1,
                ease: 'Linear',
                duration: 50000,
                repeat: 0,
                yoyo: false,
            });

        tween.on('complete', () => {
            this.win = true;
            this.levelFinish("WINNER :)")

        })

        this.player = this.add.group({
            maxSize: 2,
            runChildUpdate: true
        });
        this.enemy = this.add.group({
            maxSize: 10,
            runChildUpdate: true
        })
        this.item = this.add.group({
            maxSize: 10,
            runChildUpdate: true
        })
        this.playerInit();
        this.enemy.add(new Enemy(this, 100, -5));
        this.physics.add.collider(this.player, this.enemy, this.touchEnemy, null, this);
        this.physics.add.collider(this.player, this.item, this.touchItem, null, this);
        this.physics.add.collider(this.enemy, this.bulletPool.getPhaserGroup(), this.EnemyDie,null,this);
        if(this.multiplayer)
        this.physics.add.collider(this.enemy, this.bulletPool2.getPhaserGroup(), this.EnemyDie2,null,this);
        this.item.add(new item(this, 100, 0));
    }
    update() {

        this.EnemySpawn();
        this.itemSpawn();
        this.returnTitle();
        if (Phaser.Input.Keyboard.JustDown(this.toggleDebug)) {
            if (this.physics.world.drawDebug) {
                this.physics.world.drawDebug = false;
                this.physics.world.debugGraphic.clear();
            }
            else {
                this.physics.world.drawDebug = true;
            }
        }
    }
    touchItem(player, item) {
        var touch=this.sound.add('lucky')
        touch.play();
        item.destroy()
        player.powNum++;
    }
    touchEnemy(player, enemy) {
        if (!this.win) {
            var death = this.sound.add('dead')
            death.play();
            player.destroy();
            if (this.player.countActive(true) == 0) {
                this.levelFinish("GAME OVER");
            }
        }
    }
    playerInit() {
        this.bulletPool = new Pool(this, 100, false);
        let bullets = []
        for (let i = 0; i < 100; i++) {
            let bullet = new Bullet(this, 0, 0, this.bulletPool);
            bullets.push(bullet);
        }
        this.bulletPool.addMultipleEntity(bullets);
        
        var playerInput = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
        if (this.multiplayer) {
            var player2Input = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                space: Phaser.Input.Keyboard.KeyCodes.ENTER,
            });
            this.bulletPool2 = new Pool(this, 100, false);
            let bullets2 = []
            for (let i = 0; i < 100; i++) {
                let bullet2 = new Bullet(this, 0, 0, this.bulletPool2);
                bullets2.push(bullet2);
            }
            this.bulletPool2.addMultipleEntity(bullets2);

            var p2Pos = this.cameras.main.centerX + this.cameras.main.centerX / 2;

            this.player.add(new Player(this, p2Pos, 200, 'player2', player2Input,this.bulletPool2));

            this.player.add(new Player(this, this.cameras.main.centerX / 2, 200, 'player', playerInput,this.bulletPool));
        }
        else {
            this.player.add(new Player(this, this.cameras.main.centerX, 200, 'player', playerInput,this.bulletPool));
        }
    }
    EnemyDie(enemy, bullet)
    { 
     enemy.death();
     this.bulletPool.release(bullet);
    }
    EnemyDie2(enemy, bullet)
    { 
     enemy.death();
     this.bulletPool2.release(bullet);
    }
    EnemySpawn() {
        this.enemyTime--;
        if (this.enemyTime <= 0) {
            var spawnPoint = Phaser.Math.Between(30, 226);
            this.enemy.add(new Enemy(this, spawnPoint, -5));
            this.enemyTime = 1000;
        }
    }
    itemSpawn() {
        this.itemTime--;
        if (this.itemTime <= 0) {
            var spawnPoint = Phaser.Math.Between(30, 226);
            this.item.add(new item(this, spawnPoint, 0));
            this.itemTime = 2000;
        }
    }
    levelFinish(smh) {
        let text = this.add.text(this.cameras.main.centerX, 80, smh, {
            fontFamily: 'gummy',
        });
        text.setOrigin(0.5, 0.5);
        text.setAlign('center');
        text.setFontSize(40);
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        text.setStroke("#" + randomColor, 4)
        text.setFill('#FFFFFF');
        this.levelEnded = true;
    }
    returnTitle() {
        if (this.levelEnded) {
            this.transitionTime--;
            if (this.transitionTime <= 0) {
                this.levelEnded = false;
                this.transitionTime = 500;
                this.enemyTime = 1000;
                this.itemTime = 2000;
                this.scene.start('Title');
            }
        }
    }
}