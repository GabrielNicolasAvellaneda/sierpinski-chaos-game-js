function main() {
    var corners = [{x: 128, y: 0}, {x: 0, y: 255}, {x: 255, y: 255}];

    var canvas = document.getElementById('canvas');
    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#333";

    function random() {
        return Math.floor(Math.random() * 3);
    }

    function randomCorner() {
        return corners[random()];
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

    var pt = point(0, 0);
    for (var i = 0; i < 100000; i++) {
        var corner = randomCorner();
        pt = dividePoint(addPoints(pt, corner), 2);
        ctx.fillRect(pt.x, pt.y, 1, 1);
    }

}
