import '../styles/index.sass';
import './pace.min.js';
import gsap from 'gsap';
import barba from '@barba/core';
import * as PIXI from 'pixi.js';

function pageTransition() {
  var tl = gsap.timeline();
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleX: 1,
    transformOrigin: 'top left',
    stagger: 0.2,
  });
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleX: 0,
    transformOrigin: 'top left',
    stagger: 0.1,
    delay: 0.1,
  });
}

function contentAnimation() {
  gsap.from('main', {
    duration: 0.4,
    y: 30,
    autoAlpha: 0,
    delay: 0.5,
  });

  gsap.from('canvas', {
    duration: 0.4,
    y: 30,
    autoAlpha: 0,
    delay: 0.5,
  });
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,

  to: {
    namespace: ['home'],
  },

  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },

      async enter({ current, next, trigger }) {
        contentAnimation();
      },

      async once({ current, next, trigger }) {
        console.log(next.namespace);
        contentAnimation();
      },
    },
  ],
});

setTimeout(() => {
  var tl = gsap.timeline();
  tl.to('canvas', {
    duration: 0.2,
    scale: 0.95,
  });

  tl.to('.reveal span', {
    y: '-100%',
    duration: 0.4,
  });

  tl.to(
    'canvas',
    {
      rotate: -180,
      duration: 1,
    },
    '-=0.4'
  );

  tl.to('canvas', {
    duration: 0.2,
    scale: 1,
  });
}, 2000);

setTimeout(() => {
  var tl = gsap.timeline();
  tl.to('canvas', {
    duration: 0.2,
    scale: 0.95,
  });

  tl.to('.reveal span', {
    y: '0%',
    duration: 0.4,
  });

  tl.to(
    'canvas',
    {
      rotate: -360,
      duration: 1,
    },
    '-=0.4'
  );

  tl.to('canvas', {
    duration: 0.2,
    scale: 1,
  });
}, 6000);

var app, displacementSprite, displacementFilter;

function initPixi() {
  app = new PIXI.Application({ width: 913, height: 1371 });
  document.body.appendChild(app.view);
  app.renderer.backgroundColor = 0xffffff;

  var image = new PIXI.Sprite.from('./assets/img/feature.png');

  const imageWidth = 913;
  image.width = imageWidth;
  image.height = 1371;

  // image.x = window.innerWidth / 2 - imageWidth / 2;

  app.stage.addChild(image);

  displacementSprite = new PIXI.Sprite.from('./assets/img/texture.jpg');
  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

  app.stage.addChild(displacementSprite);
  app.stage.filters = [displacementFilter];
  app.renderer.view.style.transform = 'scale(1.02)';

  displacementSprite.scale.x = 6;
  displacementSprite.scale.y = 6;

  animate();
}

function animate() {
  displacementSprite.x += 10;
  displacementSprite.y += 4;
  requestAnimationFrame(animate);
}

initPixi();
