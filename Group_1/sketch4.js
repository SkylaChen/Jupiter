var particles = [];
var nums = 10;
var noiseScale = 2000;
var radius;
var palette;
var paper;

function setup(){
	if(windowHeight < windowWidth){
	createCanvas(windowHeight, windowHeight);
	radius = (windowHeight/2)-(windowHeight/10)
	}
	else{
	createCanvas(windowWidth, windowWidth);
	radius = (windowWidth/2)-(windowWidth/10)
	}
	randomSeed(42);
	noiseSeed(42);
	palette = createCols(URL[int(random(URL.length))])
	background(100);
	createpaper()
	noStroke();
	init();
	image(paper,0,0);
	finishDrawing();
	noLoop();
}

function init(){
		let c = shuffle(palette)[0]
		for(var i = 0; i < nums; i++){
			let padding = width/2-radius;
			particles[i] = new Particle(random(padding, width-padding),random(padding,height-padding),c);
	}
}

function finishDrawing(){
	for(var step = 1; step <= 2000; step++){
		if(step%100 == 0){
			let c = shuffle(palette)[0]
			for(var i = 0; i < nums; i++){
			particles[i].c = c;
			}
		}
		for(var i = 0; i < nums; i++){
			var sz = 10;
			particles[i].checkEdge(radius);
			particles[i].move();
			particles[i].display(sz);
		}
	}
}

function draw(){}

class Particle{
	constructor (x, y, c){
		this.dir = createVector(0, 0);
		this.vel = createVector(0, 0);
		this.pos = createVector(x, y);
		this.speed = 1;
		this.c = color(c)
	}
	move(){
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}
	checkEdge(radius){
		if (dist(width / 2, height / 2, this.pos.x, this.pos.y) > radius) {
			var angle = random(TWO_PI);
      this.pos.x = cos(angle)*radius+width/2;
			this.pos.y = sin(angle)*radius+height/2;
		}
	}
	display(r){
		push()
		fill(this.c)
		let alpha = atan2(this.dir.y,this.dir.x)
		translate(this.pos.x, this.pos.y)
		rotate(alpha)
		rect(0, 0, r, r);
		pop()
	}
}

function keyPressed(){
	if(key === 's') save();
}

const URL  = [
		"https://coolors.co/palette/264653-2a9d8f-e9c46a-e76f51"
	]

function createCols(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}

function createpaper(){
	paper = createGraphics(width, height);
	paper.fill("#F6F2E9")
	paper.noStroke();
	paper.rect(0,0,width,height)
	paper.fill(255,50);
  for (let i = 0; i < 500000; i++) {
    let x = random(paper.width);
    let y = random(paper.height);
    paper.circle(x, y, random(0.5,2));
	}
}
