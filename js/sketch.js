var root
var width
var height
var octx
var ocanvas

points = [
    [40, 70],
    [70, 130],
    [90, 40],
    [110, 100],
    [140, 110],
    [160, 100],
    [150, 30]
];

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
    var total_puntos = 15
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
    var pointForKnn = [150,300];
    var pointForCircleQuery=[350,150];
    var pointForRectangleQuery=[300,300];
    var radio=50;
    var colaCircle=[];
    var rectangleHW=[75,30];
    var colaRectangle=[];

    fill(255, 0, 0);
    circle(point[0], height - point[1], 7);


    root = build_kdtree(data);
    renderTree(root);
    console.log("root:", root);
    console.log("data: ", data);

    // dibujar_busqueda(data);
    // dibujar_busqueda(point);

    console.log("Obtener Altura del KDTree: ", getHeight(build_kdtree(data)));
    console.log("Punto a Tomar en consideracion: " , point);
    console.log("Punto mas cercano por fuerza bruta: ", closest_point_brute_force(data, point),"Distancia: ",distanceSquared(point,closest_point_brute_force(data, point)));
    console.log("Punto mas cercano por Naive Closest Point: ", naive_closest_point(root,point));
    console.log("Generacion de Dot: ",'\n', 'digraph G { \n',generate_dot(build_kdtree(data)),'}\n');

    d3.select("#graphdot").graphviz()
    .renderDot('digraph G {'+generate_dot(build_kdtree(data))+'}');

    var kPuntos=3
    knnQuery(root,pointForKnn,kPuntos);
    circleQuery(root,pointForCircleQuery,radio,colaCircle);
    rectangleQuery(root,pointForRectangleQuery,rectangleHW,colaRectangle);

}

function knnQuery(root,pointForKnn,kPuntos){
    fill(0, 255, 0);
    circle(pointForKnn[0], height - pointForKnn[1], 7);

    var punto_cercano = closest_n_points(root,pointForKnn,kPuntos);
    //var punto_cercano = closest_point(root,pointForKnn);
    for (var i = punto_cercano.length-1; i >= 0; i--)
    {
        fill(255,0,0);
        circle(punto_cercano[i][0],height - punto_cercano[i][1], 7);
    }
    console.log("Resultado de KNN para :", kPuntos,"KPuntos. El Resultado es: ",punto_cercano);
}
function circleQuery(root,pointForCircleQuery,radio,colaCircle){
    fill(0, 255, 128);
    circle(pointForCircleQuery[0], height - pointForCircleQuery[1], 5);
    range_query_circle(root,pointForCircleQuery,radio,colaCircle);
    fill(0,255,255,40)
    circle(pointForCircleQuery[0], height - pointForCircleQuery[1], radio*2)
    for ( let i = 0 ; i < colaCircle.length ; i ++){
        fill(255,0,255);
        circle(colaCircle[i][0],height-colaCircle[i][1],7);
    }
}

function rectangleQuery(root,pointForRectangleQuery,rectangleHW,colaRectangle){
    fill(0, 255, 128);
    circle(pointForRectangleQuery[0], height - pointForRectangleQuery[1], 5);
    range_query_rect(root,pointForRectangleQuery,rectangleHW,colaRectangle);
    fill(255,0,255,40);
    rect(pointForRectangleQuery[0]-rectangleHW[0],height-pointForRectangleQuery[1]-rectangleHW[1],rectangleHW[0]*2,rectangleHW[1]*2)
    for ( let i = 0 ; i < colaRectangle.length ; i ++){
        fill(255,0,255);
        circle(colaRectangle[i][0],height-colaRectangle[i][1],7);
    }
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






















