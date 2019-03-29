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



var cols = 25;
var rows = 25;
var grid = new Array(cols);
var gridDij = new Array(cols);
var openSet = [];
var closedSet = [];
var openSetDij = [];
var closedSetDij = [];
var start,startDij;
var end,endDij;
var w,h;
var path = [];
var pathDij = [];
var doneA = false;
var doneDij = false;
var noSolA = false;
var noSolDij = false;
var stepsA = 1;
var stepsDij = 1;
var distanceA = 0;
var distanceDij = 0;
var endLoop = false;

function Spot(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;

	// if(random(1) < 0.3){
	// 	this.wall = true;
	// }
	this.show = function(col) {
		fill(col);
		if(this.wall){
			fill(0);
		}
		noStroke();
		ellipse(this.i*w+w/2,this.j*h+h/2,w-1,h-1);
		//rect(this.i*w,this.j*h,w-1,h-1);
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

	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			if(random(1) < 0.3){
				grid[i][j].wall = true;
				gridDij[i][j].wall = true;
			}
		}
	}

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

	//DIJKSTRA END


	start = grid[0][0];
	end = grid[cols-1][rows-1];
	start.wall = false;
	end.wall = false;

	startDij = gridDij[0][0];
	endDij = gridDij[cols-1][rows-1];
	startDij.wall = false;
	endDij.wall = false;

	openSet.push(start);
	openSetDij.push(startDij);

}

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
			console.log("A* DONE in "+stepsA+" steps!");
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
			console.log("DIJKSTRA DONE in "+stepsDij+" steps!");
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

	background(255);

	for (var i=0;i<cols;i++){
		for(var j=0;j<rows;j++){
			grid[i][j].show(color(255));
		}
	}

	// for(var i=0;i<cols;i++){
	// 	for(var j=0;j<rows;j++){
	// 		fill(255,0,0);
	// 		if(gridDij[i][j].wall){
	// 			fill(0);
	// 		}
	// 		noStroke();
	// 		ellipse(gridDij[i][j].i*w+w/2+300,gridDij[i][j].j*h+h/2,w-1,h-1);

	// 	}
	// }
	
	// for(var i=0;i<closedSet.length;i++){
	// 	closedSet[i].show(color(255,0,0));
	// }
	// for(var i=0;i<openSet.length;i++){
	// 	openSet[i].show(color(0,255,0));
	// }

	if(!noSolA){
		path = [];
		var temp = current;
		path.push(temp);
		while(temp.previous){
			path.push(temp.previous);
			temp = temp.previous;
		}

		noFill();
		stroke(210,50,160);
		strokeWeight(w/2);
		beginShape();
		for(var i=0;i<path.length;i++){
			vertex(path[i].i*w+w/2,path[i].j*h+h/2);
		}
		endShape();
	}


	if(!noSolDij){
		pathDij = [];
		var tempDij = currentDij;
		pathDij.push(tempDij);
		while(tempDij.previous){
			pathDij.push(tempDij.previous);
			tempDij = tempDij.previous;
		}

		noFill();
		stroke(0,50,160);
		strokeWeight(w/2);
		beginShape();
		for(var i=0;i<pathDij.length;i++){
			vertex(pathDij[i].i*w+w/2,pathDij[i].j*h+h/2);
		}
		endShape();

		if(endLoop)
		{
			console.log("A* Path Distance: "+distanceA);
			console.log("Dijkstra Path Distance: "+distanceDij);
			noLoop();
			return;
		}

		if(doneA && doneDij){
			endLoop = true;
			//noLoop();
		}
	}

	// for(var i=0;i<path.length;i++){
	// 	path[i].show(color(0,0,255));
	// }

	


	

}
 
