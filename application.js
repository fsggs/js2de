/**
 * J2D (jQuery plugin of the fork j2ds)
 *
 * @authors DeVinterX, Skaner(j2ds)
 * @license BSD, zlib(j2ds)
 * @version 0.1.3, j2ds(0.1.1.d91880)
 */

/*
 * TODO:: Bugs from j2ds
 * TODO:: Bug with context line(width)
 * TODO:: Storage
 * TODO:: FPS as part of Debug module!
 * TODO:: blur & focus element, +!keyboard
 */

var global;

requirejs.config({
    baseUrl: "js/",
    paths: {
        'jquery': 'jquery-2.1.4.min'
    }
});

define('Application', [
    'jquery',
    'jquery.j2d',
    'j2d/j2d.input',
    'j2d/j2d.fps',
    'j2d/j2d.rect',
    'j2d/j2d.line',
    'j2d/j2d.text'
], function ($, J2D, IO, FPS) {
    "use strict";

    J2D.initJQueryPlugin();

    $(document).ready(function () {
        var j2d = $('#j2d').j2d();
        var io = j2d.IOHandler(new IO(j2d));
        io.toggleCursor(true);

        io.setKeys({
            ACTION: [IO.key.KEY_MOUSE_LEFT, true],
            ALT_ACTION: [IO.key.KEY_MOUSE_RIGHT, true],
            TEST_BUTTON: [IO.key.KEY_W, true]
        });

        //var device = j2d.device;
        var scene = j2d.scene;
        var layers = j2d.layers;
        var fps = new FPS(j2d);

        layers.getLayer('1');
        var vec2df = j2d.vector.vec2df;

        scene.init(400, 300);
        //scene.init(device.width, device.height);

        var background = layers.add('background', -1);
        background.fill('black');

        var size = vec2df(25, 25);
        var a = scene.addRectNode(vec2df(40, 40), size, 'red');
        var b = scene.addRectNode(vec2df(140, 140), size, 'green');
        b.setLayer('background');
        var s = scene.addLineNode(vec2df(60, 60), [[0, 0], [100, 100]], 1, 'red', 2);

        var _fps = scene.addTextNode(vec2df(5, 5), '', 12, 'white');

        var move_controller = function () {
            var keyData;
            if (keyData = io.checkPressedKeyMap('ACTION')) {
                a.setPosition(io.getPosition());
                s.setPosition(io.getPosition());

                //console.log(io.getMouseMoveDistance());
            }
            if (keyData = io.checkPressedKeyMap('TEST_BUTTON')) {
                //console.log(keyData);
            }
        };

        var draw_animation = function () {
            a.turn(1);
        };

        var draw_viewport = function () {
            fps.start();
            scene.clear();

            s.draw();
            b.setRotation(20);

            a.draw();
            b.draw();
            //a.drawBox();
            //b.drawBox();
            _fps.drawSimpleText('Текущий FPS: ' + fps.getFPS());
            fps.end();
        };

        var Game = function () {
            // Запускаем контроллеры асинхронно! Но следим чтобы отрисовка была в одном сопроцессе!
            scene.async(draw_animation);
            scene.async(draw_viewport);
            scene.async(move_controller);
        };
        scene.start(Game, 60);
    });
});

require(['Application']);
