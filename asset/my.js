window.onload = function(){
    // // console.log("hello world!");
    nodes = new Array();
    tower = new Array();

    root = new node();
    bigcanvas = document.getElementById("bigcanvas");
    bigcanvas.height = 700;
    bigcanvas.width = 700;
    var ctx = bigcanvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(350,50,10,0,2*Math.PI);
    ctx.fillStyle="blue";
    ctx.fill();
    bigcanvas.addEventListener("mousedown", onDown);

    root.x = 350;
    root.y = 50;
    root.type = "max";
    nodes[0] = root;

    $("button#test1").click(function(){
        
        // ReDraw(root, 0);
    });

    $("button#test2").click(function(){
        for(let i=0;i<nodes.length;i++){
            if(nodes[i].picked==0){
                if(i==nodes.length-1){
                    return;
                }
                continue;
            }
            nodes[i].children.push(new node());
            nodes[i].children[nodes[i].children.length-1].par=nodes[i];
            if(nodes[i].type=="max")
                nodes[i].children[nodes[i].children.length-1].type="min";
            else if(nodes[i].type=="min")
                nodes[i].children[nodes[i].children.length-1].type="max";
            nodes.push(nodes[i].children[nodes[i].children.length-1]);
            nodes[i].children[nodes[i].children.length-1].y=nodes[i].y + 50;
            nodes[i].children[nodes[i].children.length-1].x=nodes[i].x;
            break;
        }
        getDepth(root, 0);
        ReDraw(root, 0);
        for(let i=0;i<nodes.length;i++){
            nodes[i].picked=0;
        }
        console.log(tower);
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
    for(let i=0;i<nodes.length;i++){
        nodes[i].picked=0;
    }
    getDepth(root ,0);
    ReDraw(root, 0);
    for(let i=0;i<nodes.length;i++){
        if(abs(mx-nodes[i].x)<10&&abs(my-nodes[i].y)<10){
            nodes[i].picked=1;
            var ctx = bigcanvas.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth=3;
            ctx.arc(nodes[i].x, nodes[i].y , 10,0,2*Math.PI);
            ctx.strokeStyle="green";
            ctx.stroke();
        }
    }
}

function max(a,b){
    if(a>=b){
        return a;
    }
    return b;
}

function getDepth(mynode, cnt) {
    if(cnt == 0){
        tower.splice(0, tower.length);
    }
    console.log(cnt);
    cnt = cnt + 1;
    if(tower.length<cnt){
        tower.push(new Array());
    }
    tower[cnt-1].push(mynode);
    if(mynode.children.length==0){
        return cnt;
    }
    var oldcnt=cnt;
    for(let i=0;i<mynode.children.length;i++){
        cnt = max(cnt, getDepth(mynode.children[i], oldcnt));
    }
    return cnt;
}

function getIndex(arrays, obj){
    var i = arrays.length;
    while (i--) {
        if (arrays[i] === obj) {
            return i;
        }
    }
    return -1;
}

function GetCrast(x, y){
    var count = 0;
    for(let i=0;i<nodes.length;i++){
        if(nodes[i].x==x && nodes[i].y == y){
            count = count + 1;
        }
    }
    return count;
}

function ReDraw(node, cnt){
    if(cnt == 0){
        for(let i=0;i<nodes.length;i++){
            nodes[i].x=0;
            nodes[i].y=0;

        }
    }
    if(node.par==0){
        node.y = 50 + cnt*50;
        node.x = 350 + 50 * (getIndex(tower[cnt],node)-Math.floor(tower[cnt].length/2));
    } else{
        node.y = 50 + cnt*50;
        node.x = node.par.x + 50 * (getIndex(node.par.children,node)-Math.floor(node.par.children.length/2));
        while(GetCrast(node.x,node.y)!=1){
            node.x += 50;
        }
    }
    for(let i=0;i<node.children.length;i++){
        ReDraw(node.children[i], cnt+1);
    }
    if(cnt==0){
        var width = document.getElementById("bigcanvas").width;
        var height = document.getElementById("bigcanvas").height;
        var cxt=document.getElementById("bigcanvas").getContext("2d");
        cxt.clearRect(0,0,width,height); 
        for(let i=0;i<nodes.length;i++){
            var ctx = bigcanvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(nodes[i].x,nodes[i].y,10,0,2*Math.PI);
            if(nodes[i].type=="max")
                ctx.fillStyle="blue";
            else if(nodes[i].type=="min")
                ctx.fillStyle="red";
            ctx.fill();
            ctx.strokeStyle = "black";
            for(let j=0;j<nodes[i].children.length;j++){
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[i].children[j].x, nodes[i].children[j].y);
                ctx.stroke();
            }
        }

    }
}

function node(){
    this.type= 0;
    this.x=0;
    this.y=0;
    this.children=new Array();
    this.par= 0;
    this.picked=0;
}