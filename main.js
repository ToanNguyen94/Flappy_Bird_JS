let canvas = document.getElementById('game');
let ctx = canvas.getContext("2d");
let scoreshow = document.getElementById('score');

let birdimg = new Image();
let hinhnen = new Image();
let cot1 = new Image();
let cot2 = new Image();
let overbg = new Image();
let fly = new Audio();
let sco = new Audio();
let overs = new Audio();

birdimg.src = "img/bird.png";
hinhnen.src = "img/bg.png";
cot1.src = "img/ongtren.png";
cot2.src = "img/ongduoi.png";
overbg.src = "img/overs.png";
fly.src = "sounds/fly.mp3";
sco.src = "sounds/score.mp3";
overs.src = "sounds/over.mp3";

let score = 0;
let kc2cot = 200;
let count;
let bX = 200;
let bY = 250;
let cot = [];
cot[0] = {
	x: canvas.width,
	y: 0
}

function over(){
	ctx.drawImage(overbg,canvas.width/3,canvas.height/3);
}

function run() {
	ctx.drawImage(hinhnen,0,0);
	ctx.drawImage(birdimg,bX,bY);
	for(let i=0; i < cot.length; i++){
		count = cot1.height + kc2cot;
		ctx.drawImage(cot1,cot[i].x,cot[i].y);
		ctx.drawImage(cot2,cot[i].x, cot[i].y + count );
		cot[i].x --;
		if (cot[i].x == canvas.width/2) {
			cot.push ({
				x: canvas.width,
				y: Math.floor(Math.random()*cot1.height + 5) - cot1.height
			})
		}
		if (cot[i].x == 0){cot.splice(0,1)};
		if (cot[i].x == 170){
			score++;
			sco.play();
		};
		if (bY + birdimg.height == canvas.height || bX + birdimg.width >= cot[i].x &&
			bX <= cot[i].x + cot1.width && (bY <= cot[i].y + cot1.height ||
				bY + birdimg.height >= cot[i].y + count)){
					over();
					overs.play();
					return;

				}
		scoreshow.innerHTML = "score: " + score;
		if (score > 3){ return };
	}
	scoreshow.innerHTML = "score: " + score;
	bY += 3;
	requestAnimationFrame(run);
}
document.addEventListener("keydown", moveUp)
	function moveUp(){
	bY -= 60;
	fly.play();
}
run();