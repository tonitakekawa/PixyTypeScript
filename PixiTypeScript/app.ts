
var renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
var stage = new PIXI.Container();
var texture = PIXI.Texture.fromImage('charactor.png');
var sprite = new PIXI.Sprite(texture);

sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;
sprite.position.x = 200;
sprite.position.y = 150;
stage.addChild(sprite);

document.body.appendChild(renderer.view);
animate();

function animate() {
    requestAnimationFrame(animate);
    sprite.rotation += 0.1;
    renderer.render(stage);
}
