require('./styles/base.scss');

const Keyboard = require('./libs/Keyboard');
const GameEngine = require('./components/GameEngine');

window.onload = function () {
  const app = new PIXI.Application({
    width: 400,
    height: 700,
    backgroundColor: 0x1099bb,
    resolution: 1,
  });

  app.loader.add('block-empty', 'images/empty.png');
  app.loader.add('block-i', 'images/I.png');
  app.loader.add('block-j', 'images/J.png');
  app.loader.add('block-l', 'images/L.png');
  app.loader.add('block-o', 'images/O.png');
  app.loader.add('block-s', 'images/S.png');
  app.loader.add('block-t', 'images/T.png');
  app.loader.add('block-z', 'images/Z.png');

  document.getElementById('game').appendChild(app.view);

  // When all the assets are loaded start the game
  app.loader.onComplete.add(startGame);

  // Start the application
  app.loader.load();

  function startGame () {
    const ge = new GameEngine({ resources: app.loader.resources });

    app.stage.addChild(ge.board);

    // Game Configs
    //const delaySpeed = 1800;
    const delaySpeed = 300;
    let startDate = new Date();

    app.ticker.add(() => {
      if (!ge.gameOver) {
        const now = new Date();
        const keyPress = Keyboard.getKeyPress();

        if (keyPress === Keyboard.KEYS.KEY_UP) {
          ge.rotate(-1);
        }

        if (keyPress === Keyboard.KEYS.KEY_DOWN) {
          ge.rotate(1);
        }

        if (keyPress === Keyboard.KEYS.KEY_LEFT) {
          ge.move(-1);
        }

        if (keyPress === Keyboard.KEYS.KEY_RIGHT) {
          ge.move(1);
        }

        if ( ((now - startDate) >= delaySpeed) || keyPress === Keyboard.KEYS.KEY_SPACE ) {
          startDate = new Date();

          ge.fall();
        }

        ge.update();
      }
    });
  }
};
