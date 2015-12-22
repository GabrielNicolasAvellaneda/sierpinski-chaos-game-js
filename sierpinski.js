function sierpinskiChaos(width, height, totalPoints) {
    function random() {
        return Math.floor(Math.random() * 3);
    }

    function _randomCorner(width, height) {
        var corners = [point(Math.round(width/2), 0), point(0, height), point(width, height)];
        return function () {
            return corners[random()];
        }
    }

    function addPoints(u, v) {
        return point(u.x + v.x, u.y + v.y);
    }

    function point(x, y) {
        return {x: x, y: y};
    }

    function dividePoint(u, d) {
        var x = Math.round(u.x / 2);
        var y = Math.round(u.y / 2);
        return point(x, y);
    }

    var count = 0;
    var current = null;
    var randomCorner = _randomCorner(width, height);
    var pt = randomCorner();
    return {
        next: function () {
            if (count == totalPoints) {
                return null;
            }
            var corner = randomCorner();
            pt = dividePoint(addPoints(pt, corner), 2);
            current = pt;

            count = count + 1;
            return current;
        },
        current: function () {
            return current;
        }
    }
}

function main() {
    var canvas = document.getElementById('canvas');
    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#333";
    var sierpinski = sierpinskiChaos(255, 255, 1000000);
    var run = function () {
        var pt = sierpinski.next();
        if (pt == null) {
            return;
        }
        ctx.fillRect(pt.x, pt.y, 1, 1);
        setTimeout(run, 10);
    };

    run();
}
