var root
var width
var height
var octx
var ocanvas

points = [
    [40, 70],                            // var data = [
    [70, 130],                            //[40 ,70] ,
    [90, 40],                             //[70 ,130] ,
    [110, 100],                           //[90 ,40] ,
    [140, 110],                           //[110 , 100] ,
    [160, 150]                            //[140 ,110] ,
];                                       //[160 , 100]
                                         // ];
function setup() {
    width = 500;
    height = 400;
    let kdtreeCanvas = createCanvas(width, height);
    kdtreeCanvas.parent("kdtreeCanvas");

    background(0);
    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke(125, 125, 125);
            strokeWeight(1);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }

    var data = [];
    var total_puntos = 25
    for (let i = 0; i < total_puntos; i++) {
        var x = Math.floor(Math.random() * height);
        var y = Math.floor(Math.random() * height);
        data.push([x, y]);
    }
    //data=points;          // editar esta linea para elegir entre varios puntos ramdon o usar puntos prueba
    for (let i = 0; i < data.length; i++) {
        fill(255, 255, 255);
        circle(data[i][0], height - data[i][1], 7); // 200 -y para q se dibuje apropiadamente
        textSize(11);
        text('(' + data[i][0] + ',' + data[i][1] + ')', data[i][0] + 5, height - data[i][1]);// 200 -y para q se dibuje apropiadamente
    }
    var point = [140, 90]; // query

    root = build_kdtree(data);
    renderTree(root);
    console.log("root:", root);
    console.log("data: ", data);

    // dibujar_busqueda(data);


    // dibujar_busqueda(point);
    console.log("Punto a Tomar en consideracion: " , point);
    console.log("Obtener Altura del KDTree: ", getHeight(build_kdtree(data)));
    //console.log("Punto mas cercano por fuerza bruta: ", closest_point_brute_force(data, point));
    // console.log("ss: ", naive_closest_point(data, point));
    console.log("Punto mas cercano por Naive Closest Point: ");
    console.log("Generacion de Dot: ",'\n', 'digraph G { \n',generate_dot(build_kdtree(data)),'}\n');


    d3.select("#graphdot").graphviz()
    .renderDot('digraph G {'+generate_dot(build_kdtree(data))+'}');
    
    
}

function renderTree(kdtree) {
    grosor=5;
    render(kdtree, [[0, width], [0, height]],grosor);

    function render(node, bounds,grosor) {
        grosor=(grosor>1)?grosor:1;
        if (node == null) return;
        var leftBounds = [];
        leftBounds[0] = bounds[0].slice(0);
        leftBounds[1] = bounds[1].slice(0);

        var rightBounds = [];
        rightBounds[0] = bounds[0].slice(0);
        rightBounds[1] = bounds[1].slice(0);

        if (node.axis == 0) {
            stroke(125, 125, 255);
            strokeWeight(grosor);
            line(node.point[0], height - bounds[1][0], node.point[0], height - bounds[1][1]);
            leftBounds[0][1] = node.point[0];
            rightBounds[0][0] = node.point[0];

        } else {
            stroke(125, 125, 255);
            strokeWeight(grosor);
            line(bounds[0][0], height - node.point[1], bounds[0][1], height - node.point[1]);
            leftBounds[1][1] = node.point[1];
            rightBounds[1][0] = node.point[1];
        }
       // fill(255,0,0,10);
        //rect(bounds[0][0], bounds[1][0], bounds[0][1] - bounds[0][0], bounds[1][1] - bounds[1][0])
        render(node.left, leftBounds,grosor-1);
        render(node.right, rightBounds,grosor-1);
    }

}






















