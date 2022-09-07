function draw(){

    function renderTree() {
        //ctx.clearRect(0,0,canvas.width, canvas.height);
        render(root, [[0, width], [0, height]]);

        function render(node, bounds) {
            if (node == null) return;

            octx.beginPath();
            octx.fillStyle = "#00f";
            octx.beginPath();
            octx.arc(node.point.x, node.point.y, 5, 0, Math.PI * 2);
            octx.closePath();
            octx.fill();

            var leftBounds = [];
            leftBounds[0] = bounds[0].slice(0);
            leftBounds[1] = bounds[1].slice(0);

            var rightBounds = [];
            rightBounds[0] = bounds[0].slice(0);
            rightBounds[1] = bounds[1].slice(0);

            octx.beginPath();
            if (node.dimension == 0) { // was split on x value
                ctx.moveTo(node.point.x, bounds[1][0]);
                ctx.lineTo(node.point.x, bounds[1][1]);
                leftBounds[0][1] = node.point.x;
                rightBounds[0][0] = node.point.x;
            } else {
                octx.moveTo(bounds[0][0], node.point.y);
                octx.lineTo(bounds[0][1], node.point.y);
                leftBounds[1][1] = node.point.y;
                rightBounds[1][0] = node.point.y;
            }
            octx.closePath();
            octx.stroke();

            octx.fillStyle = "rgba(255,0,0,0.2)";
            octx.fillRect(bounds[0][0], bounds[1][0], bounds[0][1] - bounds[0][0], bounds[1][1] - bounds[1][0]);

            render(node.left, leftBounds);
            render(node.right, rightBounds);
        }
        console.log("sss1")
    }
    renderTree();
    console.log("sss2")
}