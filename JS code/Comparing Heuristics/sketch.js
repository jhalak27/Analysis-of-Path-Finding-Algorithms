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
function heuristic1(a,b){
	//var d = dist(a.i,a.j,b.i,b.j);
	var d = abs(a.i-b.i) + abs(a.j-b.j);
	return d;
}
function heuristic2(a,b){
	var d = dist(a.i,a.j,b.i,b.j);
	//var d = abs(a.i-b.i) + abs(a.j-b.j);
	return 500*d+1000;
}
function heuristic3(a,b){
	var d = Math.max(abs(a.i-b.i),abs(a.j-b.j));
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
		if(x=="Show Euclidean"){
			document.getElementById(x_id).value="Hide Euclidean";
			showA = true;
			showFinalPath();
		}
		else if(x=="Hide Euclidean"){
			document.getElementById(x_id).value="Show Euclidean";
			showA = false;
			showFinalPath();
		}
	}
	if(x_id=="D"){
		if(x=="Show Manhatten"){
			document.getElementById(x_id).value="Hide Manhatten";
			showMan = true;
			showFinalPath();
		}
		else if(x=="Hide Manhatten"){
			document.getElementById(x_id).value="Show Manhatten";
			showMan = false;
			showFinalPath();
		}
	}
	if(x_id=="AOpp"){
		if(x=="Show Overestimate"){
			document.getElementById(x_id).value="Hide Overestimate";
			showAOpp = true;
			showFinalPath();
		}
		else if(x=="Hide Overestimate"){
			document.getElementById(x_id).value="Show Overestimate";
			showAOpp = false;
			showFinalPath();
		}
	}
	if(x_id=="Dia"){
		if(x=="Show Diagonal"){
			document.getElementById(x_id).value="Hide Diagonal";
			showD = true;
			showFinalPath();
		}
		else if(x=="Hide Diagonal"){
			document.getElementById(x_id).value="Show Diagonal";
			showD = false;
			showFinalPath();
		}
	}

}

function showFinalPath(){
	if(endLoop){
		if(!showA){
			noFill();
			stroke(255);
			strokeWeight(w/4);
			beginShape();
			for(var i=0;i<finalPath.length;i++){
				vertex(finalPath[i].i*w+w/2,finalPath[i].j*h+h/2+h/3);
			}
			endShape();
		}
		if(!showMan){
			noFill();
			stroke(255);
			strokeWeight(w/4);
			beginShape();
			for(var i=0;i<finalPathMan.length;i++){
				vertex(finalPathMan[i].i*w+w/2,finalPathMan[i].j*h+h/2);
			}
			endShape();
		}
		if(!showAOpp){
			noFill();
			stroke(255);
			strokeWeight(w/4);
			beginShape();
			for(var i=0;i<finalPathOpp.length;i++){
				vertex(finalPathOpp[i].i*w+w/2,finalPathOpp[i].j*h+h/2-h/3);
			}
			endShape();
		}
		if(!showD){
			noFill();
			stroke(255);
			strokeWeight(w/4);
			beginShape();
			for(var i=0;i<finalPathD.length;i++){
				vertex(finalPathD[i].i*w+w/2,finalPathD[i].j*h+h/2-h/3);
			}
			endShape();
		}
		
		if(showA){
			noFill();
			stroke(210,50,160);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<finalPath.length;i++){
				vertex(finalPath[i].i*w+w/2,finalPath[i].j*h+h/2+h/3);
			}
			endShape();
		}
		if(showMan){
			noFill();
			stroke(0,50,160);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<finalPathMan.length;i++){
				vertex(finalPathMan[i].i*w+w/2,finalPathMan[i].j*h+h/2);
			}
			endShape();
		}
		if(showAOpp){
			noFill();
			stroke(50,250,50);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<finalPathOpp.length;i++){
				vertex(finalPathOpp[i].i*w+w/2,finalPathOpp[i].j*h+h/2-h/3);
			}
			endShape();
		}
		if(showD){
			noFill();
			stroke(222, 243, 29);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<finalPathD.length;i++){
				vertex(finalPathD[i].i*w+w/2,finalPathD[i].j*h+h/2-h/3);
			}
			endShape();
		}
	}

}


// function mousePressed(){
// 	var X = Math.floor(mouseX/w);
// 	var Y = Math.floor(mouseY/h);
// 	end = grid[X][Y];
// 	endMan = gridMan[X][Y];
// 	startOpp = gridOpp[X][Y];
// 	closedSet = [];
// 	closedSetMan = [];
// 	closedSetOpp = [];
// 	openSet = [];
// 	openSetMan = [];
// 	openSetOpp = [];
// 	openSet.push(start);
// 	openSetMan.push(startMan);
// 	openSetOpp.push(startOpp);
// }


var startTime;
var cols = 100;
var rows = 100;
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
//Manhatten
var gridMan = new Array(cols);
var openSetMan = [];
var closedSetMan = [];
var startMan;
var endMan;
var pathMan = [];
var doneMan = false;
var noSolMan = false;
var stepsMan = 1;
var distanceMan = 0;
var showMan = true;
var finalPathMan = [];
//Aopp
var gridOpp = new Array(cols);
var openSetOpp = [];
var closedSetOpp = [];
var startOpp;
var endOpp;
var pathOpp = [];
var doneAOpp = false;
var noSolAOpp = false;
var stepsAOpp = 1;
var distanceAOpp = 0;
var showAOpp = true;
var finalPathOpp = [];

//Diagonal
var gridD = new Array(cols);
var openSetD = [];
var closedSetD = [];
var startD;
var endD;
var pathD = [];
var doneD = false;
var noSolD = false;
var stepsD = 1;
var distanceD = 0;
var showD = true;
var finalPathD = [];


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


// SETUP FUNCTION

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

	//Manhatten
	for(var i=0;i<cols;i++){
		gridMan[i] = new Array(rows);
	}
	
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridMan[i][j] = new Spot(i,j);
		}
	}

	//A* OPPOSITE
	for(var i=0;i<cols;i++){
		gridOpp[i] = new Array(rows);
	}
	
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridOpp[i][j] = new Spot(i,j);
		}
	}

	//Diagonal
	for(var i=0;i<cols;i++){
		gridD[i] = new Array(rows);
	}
	
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridD[i][j] = new Spot(i,j);
		}
	}

	// RANDOMIZE OBSTACLES
	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			if(random(1) < 0.3){
				grid[i][j].wall = true;
				gridMan[i][j].wall = true;
				gridOpp[i][j].wall = true;
				gridD[i][j].wall = true;
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
			gridMan[i][j].addNeighbors(gridMan);
		}
	}

	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridOpp[i][j].addNeighbors(gridOpp);
		}
	}

	for(var i=0;i<cols;i++) {
		for(var j=0;j<rows;j++) {
			gridD[i][j].addNeighbors(gridD);
		}
	}


	start = grid[0][0];
	end = grid[cols-1][rows-1];
	start.wall = false;
	end.wall = false;

	startMan = gridMan[0][0];
	endMan = gridMan[cols-1][rows-1];
	startMan.wall = false;
	endMan.wall = false;

	endOpp = gridOpp[cols-1][rows-1];
	startOpp = gridOpp[0][0];
	startOpp.wall = false;
	endOpp.wall = false;

	endD = gridD[cols-1][rows-1];
	startD = gridD[0][0];
	startD.wall = false;
	endD.wall = false;

	openSet.push(start);
	openSetMan.push(startMan);
	openSetOpp.push(startOpp);
	openSetD.push(startD);
	startTime = Date.now();

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
			console.log("Euclidean DONE in "+stepsA+" steps! and "+(Date.now()-startTime)/1000+" seconds.");
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

	//Manhatten
	if(openSetMan.length > 0) {

		var winnerMan = 0;
		for(var i=0;i<openSetMan.length;i++){
			if(openSetMan[i].f<openSetMan[winnerMan].f){
				winnerMan = i;
			}
		}
		var currentMan = openSetMan[winnerMan];

		if(doneMan){
			distanceMan = PathDistance(pathMan);
		}

		if(currentMan===endMan && !doneMan){
			//noLoop();
			doneMan = true;
			console.log("Manhatten DONE in "+stepsMan+" steps! and "+(Date.now()-startTime)/1000+" seconds.");
		}

		if(!doneMan){
			removeFromArray(openSetMan,currentMan);
			closedSetMan.push(currentMan);
			stepsMan++;
		}

		var neighborsMan = currentMan.neighbors;

		for(var i=0;i<neighborsMan.length;i++){
			var neighborMan = neighborsMan[i];

			if(!closedSetMan.includes(neighborMan) && !neighborMan.wall){
				var tempGMan = currentMan.g + 1;

				var newPathMan = false;
				if(openSetMan.includes(neighborMan)){
					if(tempGMan < neighborMan.g){
						neighborMan.g = tempGMan;
						newPathMan = true;
					}
				} else {
					neighborMan.g = tempGMan;
					openSetMan.push(neighborMan);
					newPathMan = true;
				}

				if(newPathMan){
					neighbor.h = heuristic1(neighborMan,end);
					neighborMan.f = neighborMan.g + neighbor.h;
					neighborMan.previous = currentMan;
				}
			}
		}

	} else {
		console.log('No Solution');
		noSolMan = true;
		//noLoop();
		//return;
	}
	//END Manhatten


	// A* OPPOSITE
	if(openSetOpp.length > 0) {
		var winnerOpp = 0;
		for(var i=0;i<openSetOpp.length;i++){
			if(openSetOpp[i].f<openSetOpp[winnerOpp].f){
				winnerOpp = i;
			}
		}
		var currentOpp = openSetOpp[winnerOpp];

		if(doneAOpp){
			distanceAOpp = PathDistance(pathOpp);
		}

		if(currentOpp===endOpp && !doneAOpp){
			//noLoop();
			doneAOpp = true;
			console.log("Overestimate DONE in "+stepsAOpp+" steps! and "+(Date.now()-startTime)/1000+" seconds.");
		}


		if(!doneAOpp){
			removeFromArray(openSetOpp,currentOpp);
			closedSetOpp.push(currentOpp);
			stepsAOpp++;
		}

		var neighborsOpp = currentOpp.neighbors;

		for(var i=0;i<neighborsOpp.length;i++){
			var neighborOpp = neighborsOpp[i];

			if(!closedSetOpp.includes(neighborOpp) && !neighborOpp.wall){
				var tempGOpp = currentOpp.g + 1;

				var newPathOpp = false;
				if(openSetOpp.includes(neighborOpp)){
					if(tempGOpp < neighborOpp.g){
						neighborOpp.g = tempGOpp;
						newPathOpp = true;
					}
				} else {
					neighborOpp.g = tempGOpp;
					openSetOpp.push(neighborOpp);
					newPathOpp = true;
				}

				if(newPathOpp){
					neighborOpp.h = heuristic2(neighborOpp,endOpp);
					neighborOpp.f = neighborOpp.g + neighborOpp.h;
					neighborOpp.previous = currentOpp;
				}
			}
		}

	} else {
		console.log('No Solution');
		noSolAOpp = true;
		//noLoop();
		//return;
	}

	// END A* OPPOSITE

	// Diagonal
	if(openSetD.length > 0) {
		var winnerD = 0;
		for(var i=0;i<openSetD.length;i++){
			if(openSetD[i].f<openSetD[winnerD].f){
				winnerD = i;
			}
		}
		var currentD = openSetD[winnerD];

		if(doneD){
			distanceD = PathDistance(pathD);
		}

		if(currentD===endD && !doneD){
			//noLoop();
			doneD = true;
			console.log("Diagonal DONE in "+stepsD+" steps! and "+(Date.now()-startTime)/1000+" seconds.");
		}


		if(!doneD){
			removeFromArray(openSetD,currentD);
			closedSetD.push(currentD);
			stepsD++;
		}

		var neighborsD = currentD.neighbors;

		for(var i=0;i<neighborsD.length;i++){
			var neighborD = neighborsD[i];

			if(!closedSetD.includes(neighborD) && !neighborD.wall){
				var tempGD = currentD.g + 1;

				var newPathD = false;
				if(openSetD.includes(neighborD)){
					if(tempGD < neighborD.g){
						neighborD.g = tempGD;
						newPathD = true;
					}
				} else {
					neighborD.g = tempGD;
					openSetD.push(neighborD);
					newPathD = true;
				}

				if(newPathD){
					neighborD.h = heuristic3(neighborD,endD);
					neighborD.f = neighborD.g + neighborD.h;
					neighborD.previous = currentD;
				}
			}
		}

	} else {
		console.log('No Solution');
		noSolD = true;
		//noLoop();
		//return;
	}

	// END Diagonal


	background(255);

	// SHOWING THE GRID
	for (var i=0;i<cols;i++){
		for(var j=0;j<rows;j++){
			grid[i][j].show(color(255));
		}
	}

	// for(var i=0;i<cols;i++){
	// 	for(var j=0;j<rows;j++){
	// 		fill(255,0,0);
	// 		if(gridMan[i][j].wall){
	// 			fill(0);
	// 		}
	// 		noStroke();
	// 		ellipse(gridMan[i][j].i*w+w/2+300,gridMan[i][j].j*h+h/2,w-1,h-1);

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

		if(showA){
			noFill();
			stroke(210,50,160);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<path.length;i++){
				vertex(path[i].i*w+w/2,path[i].j*h+h/2+h/3);
			}
			endShape();
		}
	}


	if(!noSolMan){
		pathMan = [];
		var tempMan = currentMan;
		pathMan.push(tempMan);
		while(tempMan.previous){
			pathMan.push(tempMan.previous);
			tempMan = tempMan.previous;
		}

		if(showMan){
			noFill();
			stroke(0,50,160);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<pathMan.length;i++){
				vertex(pathMan[i].i*w+w/2,pathMan[i].j*h+h/2);
			}
			endShape();
		}	
		
	}
	if(!noSolD){
		pathD = [];
		var tempD = currentD;
		pathD.push(tempD);
		while(tempD.previous){
			pathD.push(tempD.previous);
			tempD = tempD.previous;
		}

		if(showD){
			noFill();
			stroke(222, 243, 29);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<pathD.length;i++){
				vertex(pathD[i].i*w+w/2,pathD[i].j*h+h/2-h/3);
			}
			endShape();
		}	
		
	}

	if(!noSolAOpp){
		pathOpp = [];
		var tempOpp = currentOpp;
		pathOpp.push(tempOpp);
		while(tempOpp.previous){
			pathOpp.push(tempOpp.previous);
			tempOpp = tempOpp.previous;
		}

		if(showAOpp){
			noFill();
			stroke(50,250,50);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<pathOpp.length;i++){
				vertex(pathOpp[i].i*w+w/2,pathOpp[i].j*h+h/2-h/3);
			}
			endShape();
		}	

		if(endLoop)
		{
			console.log("Euclidean Path Distance: "+distanceA);
			console.log("Manhatten Path Distance: "+distanceMan);
			console.log("Overestimate Path Distance: "+distanceAOpp);
			console.log("Diagonal Path Distance: "+distanceD);
			noLoop();
			finalPath = path;
			//path = [];
			finalPathMan = pathMan;
			//pathMan = [];
			finalPathOpp = pathOpp;
			//pathOpp = [];
			finalPathD = pathD;
			noFill();
			stroke(255,255,255);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<path.length;i++){
				vertex(path[i].i*w+w/2,path[i].j*h+h/2+h/5);
			}
			endShape();

			noFill();
			stroke(255,255,255);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<pathMan.length;i++){
				vertex(pathMan[i].i*w+w/2,pathMan[i].j*h+h/2);
			}
			endShape();
			
			noFill();
			stroke(255,255,255);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<pathOpp.length;i++){
				vertex(pathOpp[i].i*w+w/2,pathOpp[i].j*h+h/2-h/5);
			}
			endShape();

			noFill();
			stroke(255,255,255);
			strokeWeight(w/5);
			beginShape();
			for(var i=0;i<pathD.length;i++){
				vertex(pathD[i].i*w+w/2,pathD[i].j*h+h/2-h/5);
			}
			endShape();

			showFinalPath();
			return;
		}

		if(doneA && doneMan && doneAOpp && doneD){
			endLoop = true;
			//noLoop();
		}
	}

	// for(var i=0;i<path.length;i++){
	// 	path[i].show(color(0,0,255));
	// }
}

