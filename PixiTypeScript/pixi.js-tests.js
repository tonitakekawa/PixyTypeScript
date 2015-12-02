var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="pixi.js.d.ts" />
var basics;
(function (basics) {
    var Basics = (function () {
        function Basics() {
            var _this = this;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.bunny.rotation += 0.1;
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            // create a texture from an image path
            var texture = PIXI.Texture.fromImage("../../_assets/basics/bunny.png");
            // create a new Sprite using the texture
            this.bunny = new PIXI.Sprite(texture);
            // center the sprite's anchor point
            this.bunny.anchor.x = 0.5;
            this.bunny.anchor.y = 0.5;
            // move the sprite to the center of the screen
            this.bunny.position.x = 200;
            this.bunny.position.y = 150;
            //add it to the stage
            this.stage.addChild(this.bunny);
            this.animate();
        }
        return Basics;
    })();
    basics.Basics = Basics;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var Click = (function () {
        function Click() {
            var _this = this;
            this.onDown = function (eventData) {
                _this.sprite.scale.x += 0.3;
                _this.sprite.scale.y += 0.3;
            };
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.sprite = PIXI.Sprite.fromImage('../../_assets/basics/bunny.png');
            this.sprite.position.set(230, 264);
            this.sprite.interactive = true;
            this.sprite.on('mousedown', this.onDown, this);
            this.sprite.on('touchstart', this.onDown, this);
            //add it to the stage
            this.stage.addChild(this.sprite);
            //start animatng
            this.animate();
        }
        return Click;
    })();
    basics.Click = Click;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var Container = (function () {
        function Container() {
            var _this = this;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.container = new PIXI.Container();
            this.stage.addChild(this.container);
            for (var j = 0; j < 5; j++) {
                for (var i = 0; i < 5; i++) {
                    var bunny = PIXI.Sprite.fromImage('../../_assets/basics/bunny.png');
                    bunny.x = 40 * i;
                    bunny.y = 40 * j;
                    this.container.addChild(bunny);
                }
                ;
            }
            ;
            /*
             * All the bunnies are added to the container with the addChild method
             * when you do this, all the bunnies become children of the container, and when a container moves,
             * so do all its children.
             * This gives you a lot of flexibility and makes it easier to position elements on the screen
             */
            this.container.x = 100;
            this.container.y = 60;
            // start animating
            this.animate();
        }
        return Container;
    })();
    basics.Container = Container;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var CustomFilter = (function () {
        function CustomFilter() {
            var _this = this;
            this.animate = function () {
                _this.filter.uniforms.customUniform.value += 0.04;
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.background = PIXI.Sprite.fromImage('../../_assets/bkg-grass.jpg');
            this.background.scale.set(1.3, 1);
            this.stage.addChild(this.background);
            PIXI.loader.add('shader', '../../_assets/basics/shader.frag');
            PIXI.loader.once('complete', this.onLoaded, this);
            PIXI.loader.load();
        }
        CustomFilter.prototype.onLoaded = function (loader, res) {
            var fragmentSrc = res.shader.data;
            this.filter = new CustomizedFilter(fragmentSrc);
            this.background.filters = [this.filter];
            this.animate();
        };
        return CustomFilter;
    })();
    basics.CustomFilter = CustomFilter;
    var CustomizedFilter = (function (_super) {
        __extends(CustomizedFilter, _super);
        function CustomizedFilter(fragmentSource) {
            _super.call(this, null, fragmentSource, {
                customUniform: {
                    type: '1f',
                    value: 0
                }
            });
        }
        return CustomizedFilter;
    })(PIXI.AbstractFilter);
    basics.CustomizedFilter = CustomizedFilter;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var Graphics = (function () {
        function Graphics() {
            var _this = this;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.stage.interactive = true;
            this.graphics = new PIXI.Graphics();
            // draw a shape
            this.graphics.moveTo(50, 50);
            this.graphics.lineTo(250, 50);
            this.graphics.lineTo(100, 100);
            this.graphics.lineTo(50, 50);
            this.graphics.endFill();
            // set a fill and a line style again and draw a rectangle
            this.graphics.lineStyle(2, 0x0000FF, 1);
            this.graphics.beginFill(0xFF700B, 1);
            this.graphics.drawRect(50, 250, 120, 120);
            // draw a rounded rectangle
            this.graphics.lineStyle(2, 0xFF00FF, 1);
            this.graphics.beginFill(0xFF00BB, 0.25);
            this.graphics.drawRoundedRect(150, 450, 300, 100, 15);
            this.graphics.endFill();
            // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
            this.graphics.lineStyle(0);
            this.graphics.beginFill(0xFFFF0B, 0.5);
            this.graphics.drawCircle(470, 90, 60);
            this.graphics.endFill();
            this.stage.addChild(this.graphics);
            // start animating
            this.animate();
        }
        return Graphics;
    })();
    basics.Graphics = Graphics;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var RenderTexture = (function () {
        function RenderTexture() {
            var _this = this;
            this.animate = function () {
                _this.renderTexture.render(_this.container);
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.container = new PIXI.Container();
            this.stage.addChild(this.container);
            for (var j = 0; j < 5; j++) {
                for (var i = 0; i < 5; i++) {
                    var bunny = PIXI.Sprite.fromImage('../../_assets/basics/bunny.png');
                    bunny.x = 40 * i;
                    bunny.y = 40 * j;
                    bunny.rotation = Math.random() * (Math.PI * 2);
                    this.container.addChild(bunny);
                }
                ;
            }
            ;
            this.renderTexture = new PIXI.RenderTexture(this.renderer, 300, 200, PIXI.SCALE_MODES.LINEAR, 0.1);
            this.sprite = new PIXI.Sprite(this.renderTexture);
            this.sprite.x = 450;
            this.sprite.y = 60;
            this.stage.addChild(this.sprite);
            this.container.x = 100;
            this.container.y = 60;
            // start animating
            this.animate();
        }
        return RenderTexture;
    })();
    basics.RenderTexture = RenderTexture;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var SpriteSheet = (function () {
        function SpriteSheet() {
            var _this = this;
            this.animate = function () {
                _this.movie.rotation += 0.01;
                //render the stage container
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            PIXI.loader.add('../../_assets/basics/fighter.json').load(function (loader, object) {
                // create an array of textures from an image path
                var frames = [];
                for (var i = 0; i < 30; i++) {
                    var val = i < 10 ? '0' + i : i;
                    // magically works since the spritesheet was loaded with the pixi loader
                    frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
                }
                // create a MovieClip (brings back memories from the days of Flash, right ?)
                _this.movie = new PIXI.extras.MovieClip(frames);
                /*
                 * A MovieClip inherits all the properties of a PIXI sprite
                 * so you can change its position, its anchor, mask it, etc
                 */
                _this.movie.position.set(300);
                _this.movie.anchor.set(0.5);
                _this.movie.animationSpeed = 0.5;
                _this.movie.play();
                _this.stage.addChild(_this.movie);
                _this.animate();
            });
        }
        return SpriteSheet;
    })();
    basics.SpriteSheet = SpriteSheet;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var Text = (function () {
        function Text() {
            var _this = this;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.basicText = new PIXI.Text('Basic Text in Pixi');
            this.basicText.x = 30;
            this.basicText.y = 90;
            this.stage.addChild(this.basicText);
            var style = {
                font: '36px Arial bold italic',
                fill: '#F7EDCA',
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440
            };
            this.richText = new PIXI.Text('Rich Text with a lot of options and across multiple lines', style);
            this.richText.x = 30;
            this.richText.y = 180;
            this.stage.addChild(this.richText);
            // start animating
            this.animate();
        }
        return Text;
    })();
    basics.Text = Text;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var TexturedMesh = (function () {
        function TexturedMesh() {
            var _this = this;
            this.animate = function () {
                _this.count += 0.1;
                //make the snake
                for (var i = 0; i < _this.points.length; i++) {
                    _this.points[i].y = Math.sin((i * 0.5) + _this.count) * 30;
                    _this.points[i].x = i * _this.ropeLength + Math.cos((i * 0.3) + _this.count) * 20;
                }
                ;
                //render the stage
                _this.renderer.render(_this.stage);
                _this.renderPoints();
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.count = 0;
            this.ropeLength = 918 / 20;
            this.ropeLength = 45;
            this.points = [];
            for (var i = 0; i < 25; i++) {
                this.points.push(new PIXI.Point(i * this.ropeLength, 0));
            }
            ;
            this.strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('../../_assets/snake.png'), this.points);
            this.strip.position.x = -40;
            this.strip.position.y = 300;
            this.stage.addChild(this.strip);
            this.graphics = new PIXI.Graphics();
            this.graphics.x = this.strip.x;
            this.graphics.y = this.strip.y;
            this.stage.addChild(this.graphics);
            //start animating
            this.animate();
        }
        TexturedMesh.prototype.renderPoints = function () {
            this.graphics.clear();
            this.graphics.lineStyle(2, 0xffc2c2);
            this.graphics.moveTo(this.points[0].x, this.points[0].y);
            for (var i = 1; i < this.points.length; i++) {
                this.graphics.lineTo(this.points[i].x, this.points[i].y);
            }
            ;
            for (var i = 1; i < this.points.length; i++) {
                this.graphics.beginFill(0xff0022);
                this.graphics.drawCircle(this.points[i].x, this.points[i].y, 10);
                this.graphics.endFill();
            }
            ;
        };
        return TexturedMesh;
    })();
    basics.TexturedMesh = TexturedMesh;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var TilingSprite = (function () {
        function TilingSprite() {
            var _this = this;
            this.animate = function () {
                _this.count += 0.005;
                _this.tilingSprite.tileScale.x = 2 + Math.sin(_this.count);
                _this.tilingSprite.tileScale.y = 2 + Math.cos(_this.count);
                _this.tilingSprite.tilePosition.x += 1;
                _this.tilingSprite.tilePosition.y += 1;
                // render the root container
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            //create a texture from an image path
            this.texture = PIXI.Texture.fromImage('../../_assets/p2.jpeg');
            /* create a tiling sprite ...
             * requires a texture, a width and a height
             * in WebGL the image size should preferably be a power of two
             */
            this.tilingSprite = new PIXI.extras.TilingSprite(this.texture, this.renderer.width, this.renderer.height);
            this.stage.addChild(this.tilingSprite);
            this.count = 0;
            this.animate();
        }
        return TilingSprite;
    })();
    basics.TilingSprite = TilingSprite;
})(basics || (basics = {}));
var basics;
(function (basics) {
    var Video = (function () {
        function Video() {
            var _this = this;
            this.animate = function () {
                //render the stage
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            //create a video texture from a path
            this.texture = PIXI.Texture.fromVideo('../../_assets/testVideo.mp4');
            //create a new sprite using the video texture (yes it's that easy)
            this.videoSprite = new PIXI.Sprite(this.texture);
            this.videoSprite.width = this.renderer.width;
            this.videoSprite.height = this.renderer.height;
            this.stage.addChild(this.videoSprite);
            this.stage.addChild(this.videoSprite);
            this.animate();
        }
        return Video;
    })();
    basics.Video = Video;
})(basics || (basics = {}));
var demos;
(function (demos) {
    var AlphaMask = (function () {
        function AlphaMask() {
            var _this = this;
            this.animate = function () {
                _this.mask.position.x += (_this.target.x - _this.mask.x) * 0.1;
                _this.mask.position.y += (_this.target.y - _this.mask.y) * 0.1;
                if (Math.abs(_this.mask.x - _this.target.x) < 1) {
                    _this.reset();
                }
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.stage.interactive = true;
            this.background = PIXI.Sprite.fromImage('../../_assets/bkg.jpg');
            this.stage.addChild(this.background);
            this.cells = PIXI.Sprite.fromImage('../../_assets/cells.png');
            this.cells.scale.set(1.5, 1.5);
            this.mask = PIXI.Sprite.fromImage('../../_assets/flowerTop.png');
            this.mask.anchor.set(0.5);
            this.mask.position.x = 310;
            this.mask.position.y = 190;
            this.cells.mask = this.mask;
            this.stage.addChild(this.mask);
            this.stage.addChild(this.cells);
            this.target = new PIXI.Point();
            this.reset();
            this.animate();
        }
        AlphaMask.prototype.reset = function () {
            this.target.x = Math.floor(Math.random() * 550);
            this.target.y = Math.floor(Math.random() * 300);
        };
        return AlphaMask;
    })();
    demos.AlphaMask = AlphaMask;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var Batch = (function () {
        function Batch() {
            var _this = this;
            this.animate = function () {
                // iterate through the sprites and update their position
                for (var i = 0; i < _this.maggots.length; i++) {
                    var dude = _this.maggots[i];
                    dude.scale.y = 0.95 + Math.sin(_this.tick + dude.offset) * 0.05;
                    dude.direction += dude.turningSpeed * 0.01;
                    dude.position.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
                    dude.position.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
                    dude.rotation = -dude.direction + Math.PI;
                    // wrap the maggots
                    if (dude.position.x < _this.dudeBounds.x) {
                        dude.position.x += _this.dudeBounds.width;
                    }
                    else if (dude.position.x > _this.dudeBounds.x + _this.dudeBounds.width) {
                        dude.position.x -= _this.dudeBounds.width;
                    }
                    if (dude.position.y < _this.dudeBounds.y) {
                        dude.position.y += _this.dudeBounds.height;
                    }
                    else if (dude.position.y > _this.dudeBounds.y + _this.dudeBounds.height) {
                        dude.position.y -= _this.dudeBounds.height;
                    }
                }
                // increment the ticker
                _this.tick += 0.1;
                // time to render the stage !
                _this.renderer.render(_this.stage);
                // request another animation frame...
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.sprites = new PIXI.ParticleContainer(10000, {
                scale: true,
                position: true,
                rotation: true,
                uvs: true,
                alpha: true
            });
            this.stage.addChild(this.sprites);
            // create an array to store all the sprites
            this.maggots = [];
            var totalSprites = this.renderer instanceof PIXI.WebGLRenderer ? 10000 : 100;
            for (var i = 0; i < totalSprites; i++) {
                // create a new Sprite
                var dude = new BatchDude(PIXI.Texture.fromImage('../../_assets/tinyMaggot.png'));
                dude.tint = Math.random() * 0xE8D4CD;
                // set the anchor point so the texture is centerd on the sprite
                dude.anchor.set(0.5);
                // different maggots, different sizes
                dude.scale.set(0.8 + Math.random() * 0.3);
                // scatter them all
                dude.x = Math.random() * this.renderer.width;
                dude.y = Math.random() * this.renderer.height;
                dude.tint = Math.random() * 0x808080;
                // create a random direction in radians
                dude.direction = Math.random() * Math.PI * 2;
                // this number will be used to modify the direction of the sprite over time
                dude.turningSpeed = Math.random() - 0.8;
                // create a random speed between 0 - 2, and these maggots are slooww
                dude.speed = (2 + Math.random() * 2) * 0.2;
                dude.offset = Math.random() * 100;
                // finally we push the dude into the maggots array so it it can be easily accessed later
                this.maggots.push(dude);
                this.sprites.addChild(dude);
            }
            // create a bounding box box for the little maggots
            var dudeBoundsPadding = 100;
            this.dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding, -dudeBoundsPadding, this.renderer.width + dudeBoundsPadding * 2, this.renderer.height + dudeBoundsPadding * 2);
            this.tick = 0;
            // start animating
            this.animate();
        }
        return Batch;
    })();
    demos.Batch = Batch;
    var BatchDude = (function (_super) {
        __extends(BatchDude, _super);
        function BatchDude(texture) {
            _super.call(this, texture);
        }
        return BatchDude;
    })(PIXI.Sprite);
    demos.BatchDude = BatchDude;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var BlendModes = (function () {
        function BlendModes() {
            var _this = this;
            this.animate = function () {
                // iterate through the dudes and update the positions
                for (var i = 0; i < _this.dudeArray.length; i++) {
                    var dude = _this.dudeArray[i];
                    dude.direction += dude.turningSpeed * 0.01;
                    dude.position.x += Math.sin(dude.direction) * dude.speed;
                    dude.position.y += Math.cos(dude.direction) * dude.speed;
                    dude.rotation = -dude.direction - Math.PI / 2;
                    // wrap the dudes by testing their bounds...
                    if (dude.position.x < _this.dudeBounds.x) {
                        dude.position.x += _this.dudeBounds.width;
                    }
                    else if (dude.position.x > _this.dudeBounds.x + _this.dudeBounds.width) {
                        dude.position.x -= _this.dudeBounds.width;
                    }
                    if (dude.position.y < _this.dudeBounds.y) {
                        dude.position.y += _this.dudeBounds.height;
                    }
                    else if (dude.position.y > _this.dudeBounds.y + _this.dudeBounds.height) {
                        dude.position.y -= _this.dudeBounds.height;
                    }
                }
                // increment the ticker
                _this.tick += 0.1;
                // time to render the stage !
                _this.renderer.render(_this.stage);
                // request another animation frame...
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            // create a new background sprite
            this.background = PIXI.Sprite.fromImage('../../_assets/BGrotate.jpg');
            this.stage.addChild(this.background);
            // create an array to store a reference to the dudes
            this.dudeArray = [];
            this.totalDudes = 20;
            for (var i = 0; i < this.totalDudes; i++) {
                // create a new Sprite that uses the image name that we just generated as its source
                var dude = new BlendModesDude(PIXI.Texture.fromImage('../../_assets/flowerTop.png'));
                dude.anchor.set(0.5);
                // set a random scale for the dude
                dude.scale.set(0.8 + Math.random() * 0.3);
                // finally let's set the dude to be at a random position...
                dude.position.x = Math.floor(Math.random() * this.renderer.width);
                dude.position.y = Math.floor(Math.random() * this.renderer.height);
                // The important bit of this example, this is how you change the default blend mode of the sprite
                dude.blendMode = PIXI.BLEND_MODES.ADD;
                // create some extra properties that will control movement
                dude.direction = Math.random() * Math.PI * 2;
                // this number will be used to modify the direction of the dude over time
                dude.turningSpeed = Math.random() - 0.8;
                // create a random speed for the dude between 0 - 2
                dude.speed = 2 + Math.random() * 2;
                // finally we push the dude into the dudeArray so it it can be easily accessed later
                this.dudeArray.push(dude);
                this.stage.addChild(dude);
            }
            // create a bounding box box for the little maggots
            var dudeBoundsPadding = 100;
            this.dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding, -dudeBoundsPadding, this.renderer.width + dudeBoundsPadding * 2, this.renderer.height + dudeBoundsPadding * 2);
            this.tick = 0;
            // start animating
            this.animate();
        }
        return BlendModes;
    })();
    demos.BlendModes = BlendModes;
    var BlendModesDude = (function (_super) {
        __extends(BlendModesDude, _super);
        function BlendModesDude(texture) {
            _super.call(this, texture);
        }
        return BlendModesDude;
    })(PIXI.Sprite);
    demos.BlendModesDude = BlendModesDude;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var CacheAsBitmap = (function () {
        function CacheAsBitmap() {
            var _this = this;
            this.onClick = function (event) {
                _this.alienContainer.cacheAsBitmap = !_this.alienContainer.cacheAsBitmap;
                //feel free to play with what's below
                //var sprite = new PIXI.Sprite(this.alienContainer.generateTexture());
                //this.stage.addChild(sprite);
                //sprite.position.x = Math.random() * 800;
                //sprite.position.y = Math.random() * 600;
            };
            this.onAssetsLoaded = function () {
                // add a bunch of aliens with textures from image paths
                var alienFrames = ['eggHead.png', 'flowerTop.png', 'helmlok.png', 'skully.png'];
                for (var i = 0; i < 100; i++) {
                    var frameName = alienFrames[i % 4];
                    // create an alien using the frame name..
                    var alien = PIXI.Sprite.fromFrame(frameName);
                    alien.tint = Math.random() * 0xFFFFFF;
                    /*
                     * fun fact for the day :)
                     * another way of doing the above would be
                     * var texture = PIXI.Texture.fromFrame(frameName);
                     * var alien = new PIXI.Sprite(texture);
                     */
                    alien.position.x = Math.random() * 800 - 400;
                    alien.position.y = Math.random() * 600 - 300;
                    alien.anchor.x = 0.5;
                    alien.anchor.y = 0.5;
                    _this.aliens.push(alien);
                    _this.alienContainer.addChild(alien);
                }
                // start animating
                _this.animate();
            };
            this.animate = function () {
                // let's rotate the aliens a little bit
                for (var i = 0; i < 100; i++) {
                    var alien = _this.aliens[i];
                    alien.rotation += 0.1;
                }
                _this.count += 0.01;
                _this.alienContainer.scale.x = Math.sin(_this.count);
                _this.alienContainer.scale.y = Math.sin(_this.count);
                _this.alienContainer.rotation += 0.01;
                // render the stage
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            // load resources
            PIXI.loader
                .add('spritesheet', '../../_assets/monsters.json')
                .load(this.onAssetsLoaded);
            // holder to store aliens
            this.aliens = [];
            this.count = 0;
            // create an empty container
            this.alienContainer = new PIXI.Container();
            this.alienContainer.position.x = 400;
            this.alienContainer.position.y = 300;
            // make the stage interactive
            this.stage.interactive = true;
            this.stage.addChild(this.alienContainer);
            this.stage.on('click', this.onClick);
            this.stage.on('tap', this.onClick);
        }
        return CacheAsBitmap;
    })();
    demos.CacheAsBitmap = CacheAsBitmap;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var DraggableBunny = (function (_super) {
        __extends(DraggableBunny, _super);
        function DraggableBunny(texture) {
            var _this = this;
            _super.call(this, texture);
            this.onDragStart = function (event) {
                // store a reference to the data
                // the reason for this is because of multitouch
                // we want to track the movement of this particular touch
                _this.data = event.data;
                _this.alpha = 0.5;
                _this.dragging = true;
            };
            this.onDragEnd = function (event) {
                //set interactiondata to null
                _this.data = null;
                _this.alpha = 1;
                _this.dragging = false;
            };
            this.onDragMove = function (event) {
                if (_this.dragging) {
                    var newPosition = _this.data.getLocalPosition(_this.parent);
                    _this.position.x = newPosition.x;
                    _this.position.y = newPosition.y;
                }
            };
            // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
            this.interactive = true;
            // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
            this.buttonMode = true;
            // center the bunny's anchor point
            this.anchor.set(0.5);
            // make it a bit bigger, so it's easier to grab
            this.scale.set(3);
            // setup events
            this
                .on('mousedown', this.onDragStart)
                .on('touchstart', this.onDragStart)
                .on('mouseup', this.onDragEnd)
                .on('mouseupoutside', this.onDragEnd)
                .on('touchend', this.onDragEnd)
                .on('touchendoutside', this.onDragEnd)
                .on('mousemove', this.onDragMove)
                .on('touchmove', this.onDragMove);
        }
        return DraggableBunny;
    })(PIXI.Sprite);
    demos.DraggableBunny = DraggableBunny;
    var Dragging = (function () {
        function Dragging() {
            var _this = this;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            //create a texture from an image
            this.texture = PIXI.Texture.fromImage('../../_assets/bunny.png');
            for (var i = 0; i < 10; i++) {
                this.createBunny(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600));
            }
            // start animating
            this.animate();
        }
        Dragging.prototype.createBunny = function (x, y) {
            // create our little bunny friend..
            var bunny = new DraggableBunny(this.texture);
            // move the sprite to its designated position
            bunny.position.x = x;
            bunny.position.y = y;
            // add it to the stage
            this.stage.addChild(bunny);
        };
        return Dragging;
    })();
    demos.Dragging = Dragging;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var GraphicsDemo = (function () {
        function GraphicsDemo() {
            var _this = this;
            this.onClick = function (event) {
                _this.graphics.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1);
                _this.graphics.moveTo(Math.random() * 620, Math.random() * 380);
                _this.graphics.bezierCurveTo(Math.random() * 620, Math.random() * 380, Math.random() * 620, Math.random() * 380, Math.random() * 620, Math.random() * 380);
            };
            this.animate = function () {
                _this.thing.clear();
                _this.count += 0.1;
                _this.thing.clear();
                _this.thing.lineStyle(10, 0xff0000, 1);
                _this.thing.beginFill(0xffFF00, 0.5);
                _this.thing.moveTo(-120 + Math.sin(_this.count) * 20, -100 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(120 + Math.cos(_this.count) * 20, -100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(120 + Math.sin(_this.count) * 20, 100 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(-120 + Math.cos(_this.count) * 20, 100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(-120 + Math.sin(_this.count) * 20, -100 + Math.cos(_this.count) * 20);
                _this.thing.rotation = _this.count * 0.1;
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.stage.interactive = true;
            this.graphics = new PIXI.Graphics();
            // set a fill and line style
            this.graphics.beginFill(0xFF3300);
            this.graphics.lineStyle(10, 0xffd900, 1);
            // draw a shape
            this.graphics.moveTo(50, 50);
            this.graphics.lineTo(250, 50);
            this.graphics.lineTo(100, 100);
            this.graphics.lineTo(250, 220);
            this.graphics.lineTo(50, 220);
            this.graphics.lineTo(50, 50);
            this.graphics.endFill();
            // set a fill and line style again
            this.graphics.lineStyle(10, 0xFF0000, 0.8);
            this.graphics.beginFill(0xFF700B, 1);
            // draw a second shape
            this.graphics.moveTo(210, 300);
            this.graphics.lineTo(450, 320);
            this.graphics.lineTo(570, 350);
            this.graphics.quadraticCurveTo(600, 0, 480, 100);
            this.graphics.lineTo(330, 120);
            this.graphics.lineTo(410, 200);
            this.graphics.lineTo(210, 300);
            this.graphics.endFill();
            // draw a rectangle
            this.graphics.lineStyle(2, 0x0000FF, 1);
            this.graphics.drawRect(50, 250, 100, 100);
            // draw a circle
            this.graphics.lineStyle(0);
            this.graphics.beginFill(0xFFFF0B, 0.5);
            this.graphics.drawCircle(470, 200, 100);
            this.graphics.endFill();
            this.graphics.lineStyle(20, 0x33FF00);
            this.graphics.moveTo(30, 30);
            this.graphics.lineTo(600, 300);
            this.stage.addChild(this.graphics);
            // let's create a moving shape
            this.thing = new PIXI.Graphics();
            this.stage.addChild(this.thing);
            this.thing.position.x = 620 / 2;
            this.thing.position.y = 380 / 2;
            this.count = 0;
            // Just click on the stage to draw random lines
            this.stage.on('click', this.onClick);
            this.stage.on('tap', this.onClick);
            // start animating
            this.animate();
        }
        return GraphicsDemo;
    })();
    demos.GraphicsDemo = GraphicsDemo;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var Interactivity = (function () {
        function Interactivity() {
            var _this = this;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            // create a background...
            this.background = PIXI.Sprite.fromImage('../../_assets/button_test_BG.jpg');
            this.background.width = this.renderer.width;
            this.background.height = this.renderer.height;
            // add background to stage...
            this.stage.addChild(this.background);
            this.buttons = [];
            var buttonPositions = [
                175, 75,
                655, 75,
                410, 325,
                150, 465,
                685, 445
            ];
            function noop() {
                console.log('click');
            }
            // create some textures from an image path
            var textureButton = PIXI.Texture.fromImage('../../_assets/button.png');
            var textureButtonDown = PIXI.Texture.fromImage('../../_assets/buttonDown.png');
            var textureButtonOver = PIXI.Texture.fromImage('../../_assets/buttonOver.png');
            for (var i = 0; i < 5; i++) {
                var button = new InteractivityButton(textureButton, textureButtonDown, textureButtonOver);
                button.position.x = buttonPositions[i * 2];
                button.position.y = buttonPositions[i * 2 + 1];
                button.tap = noop;
                button.click = noop;
                // add it to the stage
                this.stage.addChild(button);
                // add button to array
                this.buttons.push(button);
            }
            // set some silly values...
            this.buttons[0].scale.set(1.2);
            this.buttons[2].rotation = Math.PI / 10;
            this.buttons[3].scale.set(0.8);
            this.buttons[4].scale.set(0.8, 1.2);
            this.buttons[4].rotation = Math.PI;
            // start animating
            this.animate();
        }
        return Interactivity;
    })();
    demos.Interactivity = Interactivity;
    var InteractivityButton = (function (_super) {
        __extends(InteractivityButton, _super);
        function InteractivityButton(textureButton, textureButtonDown, textureButtonOver) {
            var _this = this;
            _super.call(this, textureButton);
            this.onButtonDown = function (event) {
                _this.isdown = true;
                _this.texture = _this.textureButtonDown;
                _this.alpha = 1;
            };
            this.onButtonUp = function (event) {
                _this.isdown = false;
                if (_this.isOver) {
                    _this.texture = _this.textureButtonOver;
                }
                else {
                    _this.texture = _this.textureButton;
                }
            };
            this.onButtonOver = function (event) {
                _this.isOver = true;
                if (_this.isdown) {
                    return;
                }
                _this.texture = _this.textureButtonOver;
            };
            this.onButtonOut = function (event) {
                _this.isOver = false;
                if (_this.isdown) {
                    return;
                }
                _this.texture = _this.textureButton;
            };
            // create some textures from an image path
            this.textureButton = textureButton;
            this.textureButtonDown = textureButtonDown;
            this.textureButtonOver = textureButtonOver;
            this.buttonMode = true;
            this.anchor.set(0.5);
            // make the button interactive...
            this.interactive = true;
            this
                .on('mousedown', this.onButtonDown)
                .on('touchstart', this.onButtonDown)
                .on('mouseup', this.onButtonUp)
                .on('touchend', this.onButtonUp)
                .on('mouseupoutside', this.onButtonUp)
                .on('touchendoutside', this.onButtonUp)
                .on('mouseover', this.onButtonOver)
                .on('mouseout', this.onButtonOut);
            // you can also listen to click and tap events :
            //.on('click', this.noop)
        }
        return InteractivityButton;
    })(PIXI.Sprite);
    demos.InteractivityButton = InteractivityButton;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var Masking = (function () {
        function Masking() {
            var _this = this;
            this.animate = function () {
                _this.bg.rotation += 0.01;
                _this.bgFront.rotation -= 0.01;
                _this.light1.rotation += 0.02;
                _this.light2.rotation += 0.01;
                _this.panda.scale.x = 1 + Math.sin(_this.count) * 0.04;
                _this.panda.scale.y = 1 + Math.cos(_this.count) * 0.04;
                _this.count += 0.1;
                _this.thing.clear();
                _this.thing.beginFill(0x8bc5ff, 0.4);
                _this.thing.moveTo(-120 + Math.sin(_this.count) * 20, -100 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(-320 + Math.cos(_this.count) * 20, 100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(120 + Math.cos(_this.count) * 20, -100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(120 + Math.sin(_this.count) * 20, 100 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(-120 + Math.cos(_this.count) * 20, 100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(-120 + Math.sin(_this.count) * 20, -300 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(-320 + Math.sin(_this.count) * 20, -100 + Math.cos(_this.count) * 20);
                _this.thing.rotation = _this.count * 0.1;
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.onClick = function (event) {
                if (!_this.container.mask) {
                    _this.container.mask = _this.thing;
                }
                else {
                    _this.container.mask = null;
                }
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb, antialias: true });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.stage.interactive = true;
            this.bg = PIXI.Sprite.fromImage('../../_assets/BGrotate.jpg');
            this.bg.anchor.x = 0.5;
            this.bg.anchor.y = 0.5;
            this.bg.position.x = this.renderer.width / 2;
            this.bg.position.y = this.renderer.height / 2;
            this.stage.addChild(this.bg);
            this.container = new PIXI.Container();
            this.container.position.x = this.renderer.width / 2;
            this.container.position.y = this.renderer.height / 2;
            // add a bunch of sprites
            this.bgFront = PIXI.Sprite.fromImage('../../_assets/SceneRotate.jpg');
            this.bgFront.anchor.x = 0.5;
            this.bgFront.anchor.y = 0.5;
            this.container.addChild(this.bgFront);
            this.light2 = PIXI.Sprite.fromImage('../../_assets/LightRotate2.png');
            this.light2.anchor.x = 0.5;
            this.light2.anchor.y = 0.5;
            this.container.addChild(this.light2);
            this.light1 = PIXI.Sprite.fromImage('../../_assets/LightRotate1.png');
            this.light1.anchor.x = 0.5;
            this.light1.anchor.y = 0.5;
            this.container.addChild(this.light1);
            this.panda = PIXI.Sprite.fromImage('../../_assets/panda.png');
            this.panda.anchor.x = 0.5;
            this.panda.anchor.y = 0.5;
            this.container.addChild(this.panda);
            this.stage.addChild(this.container);
            // let's create a moving shape
            this.thing = new PIXI.Graphics();
            this.stage.addChild(this.thing);
            this.thing.position.x = this.renderer.width / 2;
            this.thing.position.y = this.renderer.height / 2;
            this.thing.lineStyle(0);
            this.container.mask = this.thing;
            this.count = 0;
            this.stage.on('click', this.onClick);
            this.stage.on('tap', this.onClick);
            this.help = new PIXI.Text('Click to turn masking on / off.', { font: 'bold 12pt Arial', fill: 'white' });
            this.help.position.y = this.renderer.height - 26;
            this.help.position.x = 10;
            this.stage.addChild(this.help);
            // start animating
            this.animate();
        }
        return Masking;
    })();
    demos.Masking = Masking;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var MovieClipDemo = (function () {
        function MovieClipDemo() {
            var _this = this;
            this.onAssetsLoaded = function (loader) {
                // create an array to store the textures
                var explosionTextures = [];
                var i;
                for (i = 0; i < 26; i++) {
                    var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i + 1) + '.png');
                    explosionTextures.push(texture);
                }
                for (i = 0; i < 50; i++) {
                    // create an explosion MovieClip
                    var explosion = new PIXI.extras.MovieClip(explosionTextures);
                    explosion.position.x = Math.random() * 800;
                    explosion.position.y = Math.random() * 600;
                    explosion.anchor.x = 0.5;
                    explosion.anchor.y = 0.5;
                    explosion.rotation = Math.random() * Math.PI;
                    explosion.scale.set(0.75 + Math.random() * 0.5);
                    explosion.gotoAndPlay(Math.random() * 27);
                    _this.stage.addChild(explosion);
                }
                // start animating
                _this.animate();
            };
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            PIXI.loader
                .add('spritesheet', '../../_assets/mc.json')
                .load(this.onAssetsLoaded);
            // start animating
            this.animate();
        }
        return MovieClipDemo;
    })();
    demos.MovieClipDemo = MovieClipDemo;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var RenderTextureDemo = (function () {
        function RenderTextureDemo() {
            var _this = this;
            this.animate = function () {
                for (var i = 0; i < _this.items.length; i++) {
                    // rotate each item
                    var item = _this.items[i];
                    item.rotation += 0.1;
                }
                _this.count += 0.01;
                // swap the buffers ...
                var temp = _this.renderTexture;
                _this.renderTexture = _this.renderTexture2;
                _this.renderTexture2 = temp;
                // set the new texture
                _this.outputSprite.texture = _this.renderTexture;
                // twist this up!
                _this.stuffContainer.rotation -= 0.01;
                _this.outputSprite.scale.set(1 + Math.sin(_this.count) * 0.2);
                // render the stage to the texture
                // the 'true' clears the texture before the content is rendered
                _this.renderTexture2.render(_this.stage, null, false);
                // and finally render the stage
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            // create two render textures... these dynamic textures will be used to draw the scene into itself
            this.renderTexture = new PIXI.RenderTexture(this.renderer, this.renderer.width, this.renderer.height);
            this.renderTexture2 = new PIXI.RenderTexture(this.renderer, this.renderer.width, this.renderer.height);
            this.currentTexture = this.renderTexture;
            // create a new sprite that uses the render texture we created above
            this.outputSprite = new PIXI.Sprite(this.currentTexture);
            // align the sprite
            this.outputSprite.position.x = 400;
            this.outputSprite.position.y = 300;
            this.outputSprite.anchor.set(0.5);
            // add to stage
            this.stage.addChild(this.outputSprite);
            this.stuffContainer = new PIXI.Container();
            this.stuffContainer.position.x = 400;
            this.stuffContainer.position.y = 300;
            this.stage.addChild(this.stuffContainer);
            // create an array of image ids..
            var fruits = [
                '../../_assets/spinObj_01.png',
                '../../_assets/spinObj_02.png',
                '../../_assets/spinObj_03.png',
                '../../_assets/spinObj_04.png',
                '../../_assets/spinObj_05.png',
                '../../_assets/spinObj_06.png',
                '../../_assets/spinObj_07.png',
                '../../_assets/spinObj_08.png'
            ];
            // create an array of items
            this.items = [];
            // now create some items and randomly position them in the stuff container
            for (var i = 0; i < 20; i++) {
                var item = PIXI.Sprite.fromImage(fruits[i % fruits.length]);
                item.position.x = Math.random() * 400 - 200;
                item.position.y = Math.random() * 400 - 200;
                item.anchor.set(0.5);
                this.stuffContainer.addChild(item);
                this.items.push(item);
            }
            // used for spinning!
            this.count = 0;
            // start animating
            this.animate();
        }
        return RenderTextureDemo;
    })();
    demos.RenderTextureDemo = RenderTextureDemo;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var StripDemo = (function () {
        function StripDemo() {
            var _this = this;
            this.animate = function () {
                _this.count += 0.1;
                // make the snake
                for (var i = 0; i < _this.points.length; i++) {
                    _this.points[i].y = Math.sin((i * 0.5) + _this.count) * 30;
                    _this.points[i].x = i * _this.ropeLength + Math.cos((i * 0.3) + _this.count) * 20;
                }
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.count = 0;
            // build a rope!
            this.ropeLength = 918 / 20;
            this.points = [];
            for (var i = 0; i < 20; i++) {
                this.points.push(new PIXI.Point(i * this.ropeLength, 0));
            }
            this.strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('../../_assets/snake.png'), this.points);
            this.strip.x = -459;
            this.snakeContainer = new PIXI.Container();
            this.snakeContainer.position.x = 400;
            this.snakeContainer.position.y = 300;
            this.snakeContainer.scale.set(800 / 1100);
            this.stage.addChild(this.snakeContainer);
            this.snakeContainer.addChild(this.strip);
            // start animating
            this.animate();
        }
        return StripDemo;
    })();
    demos.StripDemo = StripDemo;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var TextDemo = (function () {
        function TextDemo() {
            var _this = this;
            this.onAssetsLoaded = function () {
                _this.bitmapFontText = new PIXI.extras.BitmapText('bitmap fonts are\n now supported!', { font: '35px Desyrel', align: 'right' });
                _this.bitmapFontText.position.x = 600 - _this.bitmapFontText.textWidth;
                _this.bitmapFontText.position.y = 20;
                _this.stage.addChild(_this.bitmapFontText);
                // add a shiny background...
                _this.background = PIXI.Sprite.fromImage('../../_assets/textDemoBG.jpg');
                _this.stage.addChild(_this.background);
                // create some white text using the Snippet webfont
                _this.textSample = new PIXI.Text('Pixi.js can has\n multiline text!', { font: '35px Snippet', fill: 'white', align: 'left' });
                _this.textSample.position.set(20);
                // create a text object with a nice stroke
                _this.spinningText = new PIXI.Text('I\'m fun!', { font: 'bold 60px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
                // setting the anchor point to 0.5 will center align the text... great for spinning!
                _this.spinningText.anchor.set(0.5);
                _this.spinningText.position.x = 310;
                _this.spinningText.position.y = 200;
                // create a text object that will be updated...
                _this.countingText = new PIXI.Text('COUNT 4EVAR: 0', { font: 'bold italic 60px Arvo', fill: '#3e1707', align: 'center', stroke: '#a4410e', strokeThickness: 7 });
                _this.countingText.position.x = 310;
                _this.countingText.position.y = 320;
                _this.countingText.anchor.x = 0.5;
                _this.stage.addChild(_this.textSample);
                _this.stage.addChild(_this.spinningText);
                _this.stage.addChild(_this.countingText);
                _this.count = 0;
            };
            this.animate = function () {
                _this.renderer.render(_this.stage);
                _this.count += 0.05;
                // update the text with a new string
                _this.countingText.text = 'COUNT 4EVAR: ' + Math.floor(_this.count);
                // let's spin the spinning text
                _this.spinningText.rotation += 0.03;
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            PIXI.loader
                .add('desyrel', '../../_assets/desyrel.xml')
                .load(this.onAssetsLoaded);
            // start animating
            this.animate();
        }
        return TextDemo;
    })();
    demos.TextDemo = TextDemo;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var TextureSwap = (function () {
        function TextureSwap() {
            var _this = this;
            this.animate = function () {
                // just for fun, let's rotate mr rabbit a little
                _this.dude.rotation += 0.1;
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.bol = false;
            //an image path
            this.texture = PIXI.Texture.fromImage('../../_assets/flowerTop.png');
            // create a second texture
            this.secondTexture = PIXI.Texture.fromImage('../../_assets/eggHead.png');
            // create a new Sprite using the texture
            this.dude = new PIXI.Sprite(this.texture);
            // center the sprites anchor point
            this.dude.anchor.set(0.5);
            // move the sprite to the center of the screen
            this.dude.position.x = this.renderer.width / 2;
            this.dude.position.y = this.renderer.height / 2;
            this.stage.addChild(this.dude);
            // make the sprite interactive
            this.dude.interactive = true;
            this.dude.on('click', function () {
                _this.bol = !_this.bol;
                if (_this.bol) {
                    _this.dude.texture = _this.secondTexture;
                }
                else {
                    _this.dude.texture = _this.texture;
                }
            });
            // start animating
            this.animate();
        }
        return TextureSwap;
    })();
    demos.TextureSwap = TextureSwap;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var Tinting = (function () {
        function Tinting() {
            var _this = this;
            this.totalDudes = 10;
            this.animate = function () {
                // iterate through the dudes and update their position
                for (var i = 0; i < _this.aliens.length; i++) {
                    var dude = _this.aliens[i];
                    dude.direction += dude.turningSpeed * 0.01;
                    dude.position.x += Math.sin(dude.direction) * dude.speed;
                    dude.position.y += Math.cos(dude.direction) * dude.speed;
                    dude.rotation = -dude.direction - Math.PI / 2;
                    // wrap the dudes by testing their bounds...
                    if (dude.position.x < _this.dudeBounds.x) {
                        dude.position.x += _this.dudeBounds.width;
                    }
                    else if (dude.position.x > _this.dudeBounds.x + _this.dudeBounds.width) {
                        dude.position.x -= _this.dudeBounds.width;
                    }
                    if (dude.position.y < _this.dudeBounds.y) {
                        dude.position.y += _this.dudeBounds.height;
                    }
                    else if (dude.position.y > _this.dudeBounds.y + _this.dudeBounds.height) {
                        dude.position.y -= _this.dudeBounds.height;
                    }
                }
                // increment the ticker
                _this.tick += 0.1;
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            // holder to store the aliens
            this.aliens = [];
            this.tick = 0;
            for (var i = 0; i < this.totalDudes; i++) {
                // create a new Sprite that uses the image name that we just generated as its source
                var dude = new TintingDude();
                // set the anchor point so the texture is centerd on the sprite
                dude.anchor.set(0.5);
                // set a random scale for the dude - no point them all being the same size!
                dude.scale.set(0.8 + Math.random() * 0.3);
                // finally lets set the dude to be at a random position..
                dude.position.x = Math.random() * this.renderer.width;
                dude.position.y = Math.random() * this.renderer.height;
                dude.tint = Math.random() * 0xFFFFFF;
                // create some extra properties that will control movement :
                // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
                dude.direction = Math.random() * Math.PI * 2;
                // this number will be used to modify the direction of the dude over time
                dude.turningSpeed = Math.random() - 0.8;
                // create a random speed for the dude between 0 - 2
                dude.speed = 2 + Math.random() * 2;
                // finally we push the dude into the aliens array so it it can be easily accessed later
                this.aliens.push(dude);
                this.stage.addChild(dude);
            }
            // create a bounding box for the little dudes
            var dudeBoundsPadding = 100;
            this.dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding, -dudeBoundsPadding, this.renderer.width + dudeBoundsPadding * 2, this.renderer.height + dudeBoundsPadding * 2);
            // start animating
            this.animate();
        }
        return Tinting;
    })();
    demos.Tinting = Tinting;
    var TintingDude = (function (_super) {
        __extends(TintingDude, _super);
        function TintingDude() {
            _super.call(this, PIXI.Texture.fromImage('../../_assets/eggHead.png'));
        }
        return TintingDude;
    })(PIXI.Sprite);
    demos.TintingDude = TintingDude;
})(demos || (demos = {}));
var demos;
(function (demos) {
    var TransparentBackground = (function () {
        function TransparentBackground() {
            var _this = this;
            this.animate = function () {
                // just for fun, let's rotate mr rabbit a little
                _this.bunny.rotation += 0.1;
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb, transparent: true });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            // create a new Sprite from an image path.
            this.bunny = PIXI.Sprite.fromImage('../../_assets/bunny.png');
            // center the sprite's anchor point
            this.bunny.anchor.set(0.5);
            // move the sprite to the center of the screen
            this.bunny.position.x = 200;
            this.bunny.position.y = 150;
            this.stage.addChild(this.bunny);
            // start animating
            this.animate();
        }
        return TransparentBackground;
    })();
    demos.TransparentBackground = TransparentBackground;
})(demos || (demos = {}));
var filters;
(function (filters) {
    var Blur = (function () {
        function Blur() {
            var _this = this;
            this.animate = function () {
                _this.count += 0.005;
                var blurAmount = Math.cos(_this.count);
                var blurAmount2 = Math.sin(_this.count);
                _this.blurFilter1.blur = 20 * (blurAmount);
                _this.blurFilter2.blur = 20 * (blurAmount2);
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600);
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.bg = PIXI.Sprite.fromImage('../../_assets/depth_blur_BG.jpg');
            this.bg.width = this.renderer.width;
            this.bg.height = this.renderer.height;
            this.stage.addChild(this.bg);
            this.littleDudes = PIXI.Sprite.fromImage('../../_assets/depth_blur_dudes.jpg');
            this.littleDudes.position.x = (this.renderer.width / 2) - 315;
            this.littleDudes.position.y = 200;
            this.stage.addChild(this.littleDudes);
            this.littleRobot = PIXI.Sprite.fromImage('../../_assets/depth_blur_moby.jpg');
            this.littleRobot.position.x = (this.renderer.width / 2) - 200;
            this.littleRobot.position.y = 100;
            this.stage.addChild(this.littleRobot);
            this.blurFilter1 = new PIXI.filters.BlurFilter();
            this.blurFilter2 = new PIXI.filters.BlurFilter();
            this.littleDudes.filters = [this.blurFilter1];
            this.littleRobot.filters = [this.blurFilter2];
            this.count = 0;
            //nimate
            this.animate();
        }
        return Blur;
    })();
    filters.Blur = Blur;
})(filters || (filters = {}));
var filters;
(function (filters) {
    var DisplacementMap = (function () {
        function DisplacementMap() {
            var _this = this;
            this.onPointerMove = function (eventData) {
                _this.ring.visible = true;
                _this.displacementSprite.x = eventData.data.global.x - 100;
                _this.displacementSprite.y = eventData.data.global.y - _this.displacementSprite.height / 2;
                _this.ring.position.x = eventData.data.global.x - 25;
                _this.ring.position.y = eventData.data.global.y;
            };
            this.animate = function () {
                _this.count += 0.05;
                for (var i = 0; i < _this.maggots.length; i++) {
                    var maggot = _this.maggots[i];
                    maggot.direction += maggot.turnSpeed * 0.01;
                    maggot.position.x += Math.sin(maggot.direction) * maggot.speed;
                    maggot.position.y += Math.cos(maggot.direction) * maggot.speed;
                    maggot.rotation = -maggot.direction - Math.PI / 2;
                    maggot.scale.x = maggot.original.x + Math.sin(_this.count) * 0.2;
                    // wrap the maggots around as the crawl
                    if (maggot.position.x < _this.bounds.x) {
                        maggot.position.x += _this.bounds.width;
                    }
                    else if (maggot.position.x > _this.bounds.x + _this.bounds.width) {
                        maggot.position.x -= _this.bounds.width;
                    }
                    if (maggot.position.y < _this.bounds.y) {
                        maggot.position.y += _this.bounds.height;
                    }
                    else if (maggot.position.y > _this.bounds.y + _this.bounds.height) {
                        maggot.position.y -= _this.bounds.height;
                    }
                }
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600);
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.stage.interactive = true;
            this.container = new PIXI.Container();
            this.stage.addChild(this.container);
            this.padding = 100;
            this.bounds = new PIXI.Rectangle(-this.padding, -this.padding, this.renderer.width + this.padding * 2, this.renderer.height + this.padding * 2);
            this.maggots = [];
            for (var i = 0; i < 20; i++) {
                var maggot = new DisplacementMapDude();
                maggot.anchor.set(0.5);
                this.container.addChild(maggot);
                maggot.direction = Math.random() * Math.PI * 2;
                maggot.speed = 1;
                maggot.turnSpeed = Math.random() - 0.8;
                maggot.position.x = Math.random() * this.bounds.width;
                maggot.position.y = Math.random() * this.bounds.height;
                maggot.scale.set(1 + Math.random() * 0.3);
                maggot.original = maggot.scale.clone();
                this.maggots.push(maggot);
            }
            this.displacementSprite = PIXI.Sprite.fromImage('../../_assets/displace.png');
            this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
            this.stage.addChild(this.displacementSprite);
            this.container.filters = [this.displacementFilter];
            this.displacementFilter.scale.x = 110;
            this.displacementFilter.scale.y = 110;
            this.ring = PIXI.Sprite.fromImage('../../_assets/ring.png');
            this.ring.anchor.set(0.5);
            this.ring.visible = false;
            this.stage.addChild(this.ring);
            this.bg = PIXI.Sprite.fromImage('../../_assets/bkg-grass.jpg');
            this.bg.width = this.renderer.width;
            this.bg.height = this.renderer.height;
            this.bg.alpha = 0.4;
            this.container.addChild(this.bg);
            this.stage
                .on('mousemove', this.onPointerMove)
                .on('touchmove', this.onPointerMove);
            this.count = 0;
            this.animate();
        }
        return DisplacementMap;
    })();
    filters.DisplacementMap = DisplacementMap;
    var DisplacementMapDude = (function (_super) {
        __extends(DisplacementMapDude, _super);
        function DisplacementMapDude() {
            _super.call(this, PIXI.Texture.fromImage('../../_assets/maggot.png'));
        }
        return DisplacementMapDude;
    })(PIXI.Sprite);
    filters.DisplacementMapDude = DisplacementMapDude;
})(filters || (filters = {}));
var filters;
(function (filters) {
    var Filter = (function () {
        function Filter() {
            var _this = this;
            this.onClick = function () {
                _this.switchy = !_this.switchy;
                if (!_this.switchy) {
                    _this.stage.filters = [_this.filter];
                }
                else {
                    _this.stage.filters = null;
                }
            };
            this.animate = function () {
                _this.background.rotation += 0.01;
                _this.bgFront.rotation -= 0.01;
                _this.light1.rotation += 0.02;
                _this.light2.rotation += 0.01;
                _this.panda.scale.x = 1 + Math.sin(_this.count) * 0.04;
                _this.panda.scale.y = 1 + Math.cos(_this.count) * 0.04;
                _this.count += 0.1;
                var matrix = _this.filter.matrix;
                matrix[1] = Math.sin(_this.count) * 3;
                matrix[2] = Math.cos(_this.count);
                matrix[3] = Math.cos(_this.count) * 1.5;
                matrix[4] = Math.sin(_this.count / 3) * 2;
                matrix[5] = Math.sin(_this.count / 2);
                matrix[6] = Math.sin(_this.count / 4);
                _this.renderer.render(_this.stage);
                requestAnimationFrame(_this.animate);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600);
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.stage.interactive = true;
            // create a texture from an image path
            var texture = PIXI.Texture.fromImage("../../_assets/basics/bunny.png");
            this.background = PIXI.Sprite.fromImage('_assets/BGrotate.jpg');
            this.background.anchor.set(0.5);
            this.background.position.x = this.renderer.width / 2;
            this.background.position.y = this.renderer.height / 2;
            this.filter = new PIXI.filters.ColorMatrixFilter();
            this.container = new PIXI.Container();
            this.container.position.x = this.renderer.width / 2;
            this.container.position.y = this.renderer.height / 2;
            this.bgFront = PIXI.Sprite.fromImage('../../_assets/SceneRotate.jpg');
            this.bgFront.anchor.set(0.5);
            this.container.addChild(this.bgFront);
            this.light2 = PIXI.Sprite.fromImage('../../_assets/LightRotate2.png');
            this.light2.anchor.set(0.5);
            this.container.addChild(this.light2);
            this.light1 = PIXI.Sprite.fromImage('../../_assets/LightRotate1.png');
            this.light1.anchor.set(0.5);
            this.container.addChild(this.light1);
            this.panda = PIXI.Sprite.fromImage('../../_assets/panda.png');
            this.panda.anchor.set(0.5);
            this.container.addChild(this.panda);
            this.stage.addChild(this.container);
            this.stage.filters = [this.filter];
            this.count = 0;
            this.switchy = false;
            this.stage.on('click', this.onClick);
            this.stage.on('tap', this.onClick);
            this.help = new PIXI.Text('Click to turn filters on / off.', { font: 'bold 12pt Arial', fill: 'white' });
            this.help.position.y = this.renderer.height - 25;
            this.help.position.x = 10;
            this.stage.addChild(this.help);
            //nimate
            this.animate();
        }
        return Filter;
    })();
    filters.Filter = Filter;
})(filters || (filters = {}));
//# sourceMappingURL=pixi.js-tests.js.map