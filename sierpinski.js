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

    return function (func) {
        var randomCorner = _randomCorner(width, height);
        var pt = randomCorner();
        for (var i = 0; i < totalPoints; i++) {
            var corner = randomCorner();
            pt = dividePoint(addPoints(pt, corner), 2);
            func(pt);
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
    sierpinski(function (pt) {
        ctx.fillRect(pt.x, pt.y, 1, 1);
    });
}
