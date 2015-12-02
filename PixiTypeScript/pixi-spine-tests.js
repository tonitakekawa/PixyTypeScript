/// <reference path="pixi.js.d.ts" />
/// <reference path="pixi-spine.d.ts" />
var Spine;
(function (Spine) {
    var Dragon = (function () {
        function Dragon() {
            var _this = this;
            this.onAssetsLoaded = function (loader, res) {
                //initiate the spine animation
                _this.dragon = new PIXI.spine.Spine(res.dragon.spineData);
                _this.dragon.skeleton.setToSetupPose();
                _this.dragon.update(0);
                _this.dragon.autoUpdate = false;
                //create a container for the spin animation and add the animation to it
                var dragonCage = new PIXI.Container();
                dragonCage.addChild(_this.dragon);
                // measure the spine animation and position it inside its container to align it to the origin
                var localRect = _this.dragon.getLocalBounds();
                _this.dragon.position.set(-localRect.x, -localRect.y);
                // now we can scale, position and rotate the container as any other display object
                var scale = Math.min((_this.renderer.width * 0.7) / dragonCage.width, (_this.renderer.height * 0.7) / dragonCage.height);
                dragonCage.scale.set(scale, scale);
                dragonCage.position.set((_this.renderer.width - dragonCage.width) * 0.5, (_this.renderer.height - dragonCage.height) * 0.5);
                // add the container to the stage
                _this.stage.addChild(dragonCage);
                // once position and scaled, set the animation to play
                _this.dragon.state.setAnimationByName(0, 'flying', true);
                _this.animate();
            };
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                // update the spine animation, only needed if dragon.autoupdate is set to false
                _this.dragon.update(0.01666666666667); // HARDCODED FRAMERATE!
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            PIXI.loader.add('dragon', '../../_assets/spine/dragon.json').load(this.onAssetsLoaded);
        }
        return Dragon;
    })();
    Spine.Dragon = Dragon;
})(Spine || (Spine = {}));
var Spine;
(function (Spine) {
    var Goblin = (function () {
        function Goblin() {
            var _this = this;
            this.onAssetsLoaded = function (loader, res) {
                //initiate the spine animation
                _this.goblin = new PIXI.spine.Spine(res.goblins.spineData);
                _this.goblin.skeleton.setSkinByName('goblin');
                _this.goblin.skeleton.setSlotsToSetupPose();
                _this.goblin.position.x = 400;
                _this.goblin.position.y = 600;
                _this.goblin.scale.set(1.5);
                _this.goblin.state.setAnimationByName(0, 'walk', true);
                _this.stage.addChild(_this.goblin);
                _this.stage.on('click', function () {
                    // change current skin
                    var currentSkinName = _this.goblin.skeleton.skin.name;
                    var newSkinName = (currentSkinName === 'goblin' ? 'goblingirl' : 'goblin');
                    _this.goblin.skeleton.setSkinByName(newSkinName);
                    _this.goblin.skeleton.setSlotsToSetupPose();
                });
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
            this.stage.interactive = true;
            PIXI.loader.add('goblins', '../../_assets/spine/goblins.json').load(this.onAssetsLoaded);
        }
        return Goblin;
    })();
    Spine.Goblin = Goblin;
})(Spine || (Spine = {}));
var Spine;
(function (Spine_1) {
    var Pixie = (function () {
        function Pixie() {
            var _this = this;
            this.onAssetsLoaded = function (loader, res) {
                _this.background = PIXI.Sprite.fromImage('../../_assets/spine/iP4_BGtile.jpg');
                _this.background2 = PIXI.Sprite.fromImage('../../_assets/spine/iP4_BGtile.jpg');
                _this.stage.addChild(_this.background);
                _this.stage.addChild(_this.background2);
                _this.foreground = PIXI.Sprite.fromImage('../../_assets/spine/iP4_ground.png');
                _this.foreground2 = PIXI.Sprite.fromImage('../../_assets/spine/iP4_ground.png');
                _this.stage.addChild(_this.foreground);
                _this.stage.addChild(_this.foreground2);
                _this.foreground.position.y = _this.foreground2.position.y = 640 - _this.foreground2.height;
                _this.pixie = new PIXI.spine.Spine(res.pixie.spineData);
                var scale = 0.3;
                _this.pixie.position.x = 1024 / 3;
                _this.pixie.position.y = 500;
                _this.pixie.scale.x = _this.pixie.scale.y = scale;
                _this.stage.addChild(_this.pixie);
                _this.pixie.stateData.setMixByName('running', 'jump', 0.2);
                _this.pixie.stateData.setMixByName('jump', 'running', 0.4);
                _this.pixie.state.setAnimationByName(0, 'running', true);
                _this.stage.on('mousedown', _this.onTouchStart);
                _this.stage.on('touchstart', _this.onTouchStart);
                _this.animate();
            };
            this.onTouchStart = function () {
                _this.pixie.state.setAnimationByName(0, 'jump', false);
                _this.pixie.state.addAnimationByName(0, 'running', true, 0);
            };
            this.animate = function () {
                _this.position += 10;
                _this.background.position.x = -(_this.position * 0.6);
                _this.background.position.x %= 1286 * 2;
                if (_this.background.position.x < 0) {
                    _this.background.position.x += 1286 * 2;
                }
                _this.background.position.x -= 1286;
                _this.background2.position.x = -(_this.position * 0.6) + 1286;
                _this.background2.position.x %= 1286 * 2;
                if (_this.background2.position.x < 0) {
                    _this.background2.position.x += 1286 * 2;
                }
                _this.background2.position.x -= 1286;
                _this.foreground.position.x = -_this.position;
                _this.foreground.position.x %= 1286 * 2;
                if (_this.foreground.position.x < 0) {
                    _this.foreground.position.x += 1286 * 2;
                }
                _this.foreground.position.x -= 1286;
                _this.foreground2.position.x = -_this.position + 1286;
                _this.foreground2.position.x %= 1286 * 2;
                if (_this.foreground2.position.x < 0) {
                    _this.foreground2.position.x += 1286 * 2;
                }
                _this.foreground2.position.x -= 1286;
                requestAnimationFrame(_this.animate);
                _this.renderer.render(_this.stage);
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
            document.body.appendChild(this.renderer.view);
            // create the root of the scene graph
            this.stage = new PIXI.Container();
            this.stage.interactive = true;
            PIXI.loader.add('pixie', '../../_assets/spine/pixie.json').load(this.onAssetsLoaded);
        }
        return Pixie;
    })();
    Spine_1.Pixie = Pixie;
    var Spine;
    (function (Spine) {
        var SpineBoy = (function () {
            function SpineBoy() {
                var _this = this;
                this.onAssetsLoaded = function (loader, res) {
                    //initiate the spine animation
                    _this.spineboy = new PIXI.spine.Spine(res.spineboy.spineData);
                    _this.spineboy.position.x = _this.renderer.width / 2;
                    _this.spineboy.position.y = _this.renderer.height;
                    _this.spineboy.scale.set(1.5);
                    // set up the mixes!
                    _this.spineboy.stateData.setMixByName('walk', 'jump', 0.2);
                    _this.spineboy.stateData.setMixByName('jump', 'walk', 0.4);
                    // play animation
                    _this.spineboy.state.setAnimationByName(0, 'walk', true);
                    _this.stage.addChild(_this.spineboy);
                    _this.stage.on('click', function () {
                        _this.spineboy.state.setAnimationByName(0, 'jump', false);
                        _this.spineboy.state.addAnimationByName(0, 'walk', true, 0);
                    });
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
                this.stage.interactive = true;
                PIXI.loader.add('spineboy', '../../_assets/spine/spineboy.json').load(this.onAssetsLoaded);
            }
            return SpineBoy;
        })();
        Spine.SpineBoy = SpineBoy;
    })(Spine || (Spine = {}));
})(Spine || (Spine = {}));
//# sourceMappingURL=pixi-spine-tests.js.map