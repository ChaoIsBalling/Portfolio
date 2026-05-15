export default class Title extends Phaser.Scene
{
    constructor(){
        super({key: "Title"});
    }
    create()
    {
        this.multiplayer=false;
        let text = this.add.text(this.cameras.main.centerX, 50, "Twin Bee",{
            fontFamily: 'gummy',
        });
        text.setOrigin(0.5,0.5);
		text.setAlign('center');
		text.setFontSize(30);
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        text.setStroke("#"+randomColor, 4)
        text.setFill('#FFFFFF');

        this.textButton(this.cameras.main.centerX, 160, '1 Player', false,'#db7644','#449cdb');
        this.textButton(this.cameras.main.centerX, 200, '2 Players', true,'#9726ed','#d91a73');
    }
	textButton(x, y, message, multi,stroke,fill){
		let text = this.add.text(x, y, message,{
            fontFamily: 'gummy',
        });
		text.setOrigin(0.5,0.5);
		text.setAlign('center');
		text.setFontSize(20);
		
		//Color del reborde de la letra y grosor si estamos en la escena con ese tipo de texto.
			text.setStroke(stroke, 4)
			text.setFill(fill);

		text.setInteractive();
		text.on('pointerdown', ()=>{
			this.scene.start('Level',{multiplayer:multi})
		})
    }
}