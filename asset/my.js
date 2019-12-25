window.onload = function(){
    console.log("hello world!");
    nodes = new Array();

    root = new node();
    bigcanvas = document.getElementById("bigcanvas");
    bigcanvas.height = 700;
    bigcanvas.width = 700;
    var ctx = bigcanvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(100,100,5,0,2*Math.PI);
    ctx.fillStyle="blue";
    ctx.fill();
    bigcanvas.addEventListener("mousedown", onDown);

    root.x = 100;
    root.y = 100;
    nodes[0] = root;
    console.log(nodes[0]);

    $("button#test1").click(function(){
        console.log("my name");
        canvas=document.createElement("canvas");
        canvas.style="width: 100px;";
        var ctx=canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(349,75,50,0,2*Math.PI);
        ctx.stroke();
        document.body.appendChild(canvas);
    });
}

function abs(a){
    if(a>=0){
        return a;
    }
    return -a;
}

function onDown(e){
    var mx = e.clientX;
    var my = e.clientY;
    // var ctx = bigcanvas.getContext("2d");
    // ctx.beginPath();
    // ctx.arc(mx, my,5,0,2*Math.PI);
    // ctx.fillStyle="blue";
    // ctx.fill();
    console.log(mx, my);
    for(let i=0;i<nodes.length;i++){
        console.log(nodes[i]);
        if(abs(mx-nodes[i].x)<5&&abs(my-nodes[i].y)<5){
            console.log("clicked!")
            nodes[i].picked=1;
            var ctx = bigcanvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y , 5,0,2*Math.PI);
            ctx.strokeStyle="yellow";
            ctx.stroke();
        }
    }
}

function node(){
    this.type= 0;
    this.x=0;
    this.y=0;
    this.left= 0;
    this.right= 0;
    this.par= 0;
    this.picked=0;
}