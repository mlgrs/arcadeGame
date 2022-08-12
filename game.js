class mainScene {
    preload() {
        //para cargar los assets
        this.load.image('jelly', './assets/jellyPink.png');
        this.load.image('player', './assets/playerPink.png');

        
    }
    create() {
        //inicializar la escena y posiciones
        this.arrow = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.image(100, 100, 'player');
        this.jelly = this.physics.add.image(300, 300, 'jelly');
        this.score = 0;
        let style = { font: '20px Roboto', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'puntaje: ', + this.score, style);
    }      

    update() {
        //se invoca 60 veces por segundo después de create()
        //se encarga de la logica del juego
        if (this.physics.overlap(this.player, this.jelly)) {
            this.hit();
        };
        //horizontal
        if (this.arrow.right.isDown) {
            this.player.x += 3;
        } else if (this.arrow.left.isDown) {
            this.player.x -= 3;
            
        };
        //vertical
        if (this.arrow.down.isDown) {
            this.player.y += 3;
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        };
    }

    hit() {
        this.jelly.x = Phaser.Math.Between(100, 600);
        this.jelly.y = Phaser.Math.Between(100, 300);
    
        this.score += 10;
    
        this.scoreText.setText('puntaje: ' + this.score);
        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
        });
    };
}

new Phaser.Game({
    backgroundColor: '#201f26',
    scene: mainScene,
    physics: { default: 'arcade' },
    parent: 'game',
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
});
