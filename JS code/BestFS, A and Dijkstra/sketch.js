function removeFromArray(arr,elt){
	for(var i =arr.length-1;i>=0;i--){
		if(arr[i] == elt) {
			arr.splice(i,1);
		}
	}
}

function heuristic(a,b){
	var d = dist(a.i,a.j,b.i,b.j);
	//var d = abs(a.i-b.i) + abs(a.j-b.j);
	return d;
}

function PathDistance(shortestPath)
{
	var d=0;
	for(var i=1;i<shortestPath.length;i++)
	{
		d += dist(shortestPath[i].i*w +w/2,shortestPath[i].j*h+h/2,shortestPath[i-1].i*w+w/2,shortestPath[i-1].j*h+h/2);
		//console.log(d);
	}
	return d;
}

function SwitchGraph(x_id){
	var x = document.getElementById(x_id).value;
	if(x_id=="A"){
		if(x=="Show A*"){
			document.getElementById(x_id).value="Hide A*";
			showA = true;
			showFinalPath();
		}
		else if(x=="Hide A*"){
			document.getElementById(x_id).value="Show A*";
			showA = false;
			showFinalPath();
		}
	}
	if(x_id=="D"){
		if(x=="Show Dijkstra"){
			document.getElementById(x_id).value="Hide Dijkstra";
			showDij = true;
			showFinalPath();
		}
		else if(x=="Hide Dijkstra"){
			document.getElementById(x_id).value="Show Dijkstra";
			showDij = false;
			showFinalPath();
		}
	}
	if(x_id=="BFS"){
		if(x=="Show BFS"){
			document.getElementById(x_id).value="Hide BFS";
			showBfs = true;
			showFinalPath();
		}
		else if(x=="Hide BFS"){
			document.getElementById(x_id).value="Show BFS";
			showBfs = false;
			showFinalPath();
		}
	}

}

function showFinalPath(){
	if(endLoop){
		if(!showA) {
			noFill();
			stroke(255);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<finalPath.length;i++){
				vertex(finalPath[i].i*w+w/2,finalPath[i].j*h+h/2);
			}
			endShape();
		}
		if(!showDij){
			noFill();
			stroke(255);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<finalPathDij.length;i++){
				vertex(finalPathDij[i].i*w+w/2,finalPathDij[i].j*h+h/2);
			}
			endShape();
		}
		if(!showBfs) {
			noFill();
			stroke(255);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<finalPathBfs.length;i++){
				vertex(finalPathBfs[i].i*w+w/2,finalPathBfs[i].j*h+h/2);
			}
			endShape();
		}

		if(showA){
			noFill();
			stroke(210,50,160);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<finalPath.length;i++){
				vertex(finalPath[i].i*w+w/2,finalPath[i].j*h+h/2);
			}
			endShape();
		}
		if(showDij){
			noFill();
			stroke(0,50,160);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<finalPathDij.length;i++){
				vertex(finalPathDij[i].i*w+w/2,finalPathDij[i].j*h+h/2);
			}
			endShape();
		}
		if(showBfs){
			noFill();
			stroke(50,250,50);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<finalPathBfs.length;i++){
				vertex(finalPathBfs[i].i*w+w/2,finalPathBfs[i].j*h+h/2);
			}
			endShape();
		}

		
	}

}




var startTime;
var cols = 20;
var rows = 20;
var w,h;
var endLoop = false;
//A*
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];
var doneA = false;
var noSolA = false;
var stepsA = 1;
var distanceA = 0;
var showA = true;
var finalPath = [];
//Dijkstra
var gridDij = new Array(cols);
var openSetDij = [];
var closedSetDij = [];
var startDij;
var endDij;
var pathDij = [];
var doneDij = false;
var noSolDij = false;
var stepsDij = 1;
var distanceDij = 0;
var showDij = true;
var finalPathDij = [];
//Best first search
var gridBfs = new Array(cols);
var openSetBfs = [];
var closedSetBfs = [];
var startBfs;
var endBfs;
var pathBfs = [];
var doneBfs = false;
var noSolBfs = false;
var stepsBfs = 1;
var distanceBfs = 0;
var showBfs = true;
var finalPathBfs = [];


// DEFINING PROPERTIES OF EACH CELL/SPOT
function Spot(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;

	this.show = function(col) {
		fill(col);
		if(this.wall){
			fill(0);
		}
		noStroke();
		ellipse(this.i*w+w/2,this.j*h+h/2,w-1,h-1);
	}

	this.addNeighbors = function(grid){
		var i = this.i;
		var j = this.j;
		if(i<cols-1){
			this.neighbors.push(grid[i+1][j]);
		}
		if(i>0){
			this.neighbors.push(grid[i-1][j]);
		}
		if(j<rows-1){
			this.neighbors.push(grid[i][j+1]);
		}
		if(j>0){
			this.neighbors.push(grid[i][j-1]);
		}
		if(i>0 && j>0){
			this.neighbors.push(grid[i-1][j-1]);	
		}
		if(i<cols-1 && j>0){
			this.neighbors.push(grid[i+1][j-1]);	
		}
		if(i>0 && j<rows-1){
			this.neighbors.push(grid[i-1][j+1]);	
		}
		if(i<cols-1 && j<rows-1){
			this.neighbors.push(grid[i+1][j+1]);	
		}
	}
}

function setup() {
	createCanvas(500,500);
	console.log('A*');

	w=width/cols;
	h=height/rows;

	startTime = Date.now();

	//A* 
	for(var i=0;i<cols;i++){
		grid[i] = new Array(rows);
	}
	
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			grid[i][j] = new Spot(i,j);
		}
	}

	//DIJKSTRA
	for(var i=0;i<cols;i++){
		gridDij[i] = new Array(rows);
	}
	
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridDij[i][j] = new Spot(i,j);
		}
	}

	//Bsf
	for(var i=0;i<cols;i++){
		gridBfs[i] = new Array(rows);
	}
	
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridBfs[i][j] = new Spot(i,j);
		}
	}

	// RANDOMIZE OBSTACLES
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			if(random(1) < 0.3){
				grid[i][j].wall = true;
				gridDij[i][j].wall = true;
				gridBfs[i][j].wall = true;
			}
		}
	}


	// ADDING NEIGHBOURS OF EACH CELL
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridDij[i][j].addNeighbors(gridDij);
		}
	}

	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridBfs[i][j].addNeighbors(gridBfs);
		}
	}


	start = grid[0][0];
	end = grid[cols-1][rows-1];
	start.wall = false;
	end.wall = false;

	startDij = gridDij[0][0];
	endDij = gridDij[cols-1][rows-1];
	startDij.wall = false;
	endDij.wall = false;

	endBfs = gridBfs[cols-1][rows-1];
	startBfs  = gridBfs[0][0];
	startBfs.wall = false;
	endBfs.wall = false;

	openSet.push(start);
	openSetDij.push(startDij);
	openSetBfs.push(startBfs);
	

}


// DRAW FUNCTION
function draw() {	
	
	if(openSet.length > 0) {

		var winner = 0;
		for(var i=0;i<openSet.length;i++){
			if(openSet[i].f<openSet[winner].f){
				winner = i;
			}
		}
		var current = openSet[winner];

		if(doneA){
			distanceA = PathDistance(path);
		}

		if(current===end && !doneA){
			//noLoop();
			doneA = true;
			console.log("A* DONE in "+stepsA+" steps! and "+(Date.now()-startTime)/1000+" seconds.");
		}

		if(!doneA){
			removeFromArray(openSet,current);
			closedSet.push(current);
			stepsA++;
		}

		var neighbors = current.neighbors;

		for(var i=0;i<neighbors.length;i++){
			var neighbor = neighbors[i];

			if(!closedSet.includes(neighbor) && !neighbor.wall){
				var tempG = current.g + 1;

				var newPath = false;
				if(openSet.includes(neighbor)){
					if(tempG < neighbor.g){
						neighbor.g = tempG;
						newPath = true;
					}
				} else {
					neighbor.g = tempG;
					openSet.push(neighbor);
					newPath = true;
				}

				if(newPath){
					neighbor.h = heuristic(neighbor,end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
				}
			}
		}

	} else {
		console.log('No Solution');
		noSolA = true;
		//noLoop();
		//return;
	}

	//DIJKSTRA
	if(openSetDij.length > 0) {

		var winnerDij = 0;
		for(var i=0;i<openSetDij.length;i++){
			if(openSetDij[i].f<openSetDij[winnerDij].f){
				winnerDij = i;
			}
		}
		var currentDij = openSetDij[winnerDij];

		if(doneDij){
			distanceDij = PathDistance(pathDij);
		}

		if(currentDij===endDij  && !doneDij){
			//noLoop();
			doneDij = true;
			console.log("DIJKSTRA DONE in "+stepsDij+" steps! and "+(Date.now()-startTime)/1000+" seconds.");
		}

		if(!doneDij){
			removeFromArray(openSetDij,currentDij);
			closedSetDij.push(currentDij);
			stepsDij++;
		}

		var neighborsDij = currentDij.neighbors;

		for(var i=0;i<neighborsDij.length;i++){
			var neighborDij = neighborsDij[i];

			if(!closedSetDij.includes(neighborDij) && !neighborDij.wall){
				var tempGDij = currentDij.g + 1;

				var newPathDij = false;
				if(openSetDij.includes(neighborDij)){
					if(tempGDij < neighborDij.g){
						neighborDij.g = tempGDij;
						newPathDij = true;
					}
				} else {
					neighborDij.g = tempGDij;
					openSetDij.push(neighborDij);
					newPathDij = true;
				}

				if(newPathDij){
					neighborDij.f = neighborDij.g;
					neighborDij.previous = currentDij;
				}
			}
		}

	} else {
		console.log('No Solution');
		noSolDij = true;
		//noLoop();
		//return;
	}
	//END DIJKSTRA


	// BestFS
	if(openSetBfs.length > 0) {
		var winnerBfs = 0;
		for(var i=0;i<openSetBfs.length;i++){
			if(openSetBfs[i].f<openSetBfs[winnerBfs].f){
				winnerBfs = i;
			}
		}
		var currentBfs = openSetBfs[winnerBfs];

		if(doneBfs){
			distanceBfs = PathDistance(pathBfs);
		}

		if(currentBfs===endBfs && !doneBfs){
			//noLoop();
			doneBfs = true;
			console.log("BEST FIRST SEARCH DONE in "+stepsBfs+" steps! and "+ (Date.now()-startTime)/1000+" seconds.");
		}

		if(!doneBfs){
			removeFromArray(openSetBfs,currentBfs);
			closedSetBfs.push(currentBfs);
			stepsBfs++;
		}

		var neighborsBfs = currentBfs.neighbors;

		for(var i=0;i<neighborsBfs.length;i++){
			var neighborBfs = neighborsBfs[i];

			if(!closedSetBfs.includes(neighborBfs) && !neighborBfs.wall){

				if(!openSetBfs.includes(neighborBfs)){
					openSetBfs.push(neighborBfs);
				}

                neighborBfs.h = heuristic(neighborBfs,endBfs);
                neighborBfs.f = neighborBfs.h;
                neighborBfs.previous = currentBfs;

			}
		}

	} else {
		console.log('No Solution');
		noSolBfs = true;
		//noLoop();
		//return;
	}

	// END BestFS


	background(255);

	// SHOWING THE GRID
	for (var i=0;i<cols;i++){
		for(var j=0;j<rows;j++){
			grid[i][j].show(color(255));
		}
	}


	if(!noSolA){
		path = [];
		var temp = current;
		path.push(temp);
		while(temp.previous){
			path.push(temp.previous);
			temp = temp.previous;
		}

		if(showA){
			noFill();
			stroke(210,50,160);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<path.length;i++){
				vertex(path[i].i*w+w/2,path[i].j*h+h/2);
			}
			endShape();
		}
	}


	if(!noSolDij){
		pathDij = [];
		var tempDij = currentDij;
		pathDij.push(tempDij);
		while(tempDij.previous){
			pathDij.push(tempDij.previous);
			tempDij = tempDij.previous;
		}

		if(showDij){
			noFill();
			stroke(0,50,160);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<pathDij.length;i++){
				vertex(pathDij[i].i*w+w/2,pathDij[i].j*h+h/2);
			}
			endShape();
		}	
		
	}

	if(!noSolBfs){
		pathBfs = [];
		var tempOpp = currentBfs;
		pathBfs.push(tempOpp);
		while(tempOpp.previous){
			pathBfs.push(tempOpp.previous);
			tempOpp = tempOpp.previous;
		}

		if(showBfs){
			noFill();
			stroke(50,250,50);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<pathBfs.length;i++){
				vertex(pathBfs[i].i*w+w/2,pathBfs[i].j*h+h/2);
			}
			endShape();
		}	

		if(endLoop)
		{
			console.log("A* Path Distance: "+distanceA);
			console.log("Dijkstra Path Distance: "+distanceDij);
			console.log("Best First Search Path Distance: "+distanceBfs);
			noLoop();
			finalPath = path;
			//path = [];
			finalPathDij = pathDij;
			//pathDij = [];
			finalPathBfs = pathBfs;
			//pathOpp = [];
			noFill();
			stroke(255,255,255);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<path.length;i++){
				vertex(path[i].i*w+w/2,path[i].j*h+h/2);
			}
			endShape();

			noFill();
			stroke(255,255,255);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<pathDij.length;i++){
				vertex(pathDij[i].i*w+w/2,pathDij[i].j*h+h/2);
			}
			endShape();
			
			noFill();
			stroke(255,255,255);
			strokeWeight(w/3);
			beginShape();
			for(var i=0;i<pathBfs.length;i++){
				vertex(pathBfs[i].i*w+w/2,pathBfs[i].j*h+h/2);
			}
			endShape();

			showFinalPath();
			return;
		}

		if(doneA && doneDij && doneBfs){
			endLoop = true;
			//noLoop();
		}
	}

}

