const Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Mouse = Matter.Mouse,
MouseConstraint = Matter.MouseConstraint;

const engine = Engine.create();

const render = Render.create({
element: document.body,
engine: engine,
options: {
width: window.innerWidth,
height: window.innerHeight,
wireframes: false,
background: 'white'
}
});

const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 20, window.innerWidth, 40, { isStatic: true });
World.add(engine.world, [ground]);

function getRandomColor() {
const letters = '0123456789ABCDEF';
let color = '#';
for (let i = 0; i < 6; i++) {
color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

function spawnBlock(x, y) {
const block = Bodies.rectangle(x, y, 50, 50, {
render: {
fillStyle: getRandomColor()
}
});
World.add(engine.world, block);
}

window.addEventListener('mousedown', function(event) {
const x = event.clientX;
const y = event.clientY;
spawnBlock(x, y);
});

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
mouse: mouse,
constraint: {
stiffness: 0.2,
render: {
visible: false
}
}
});

World.add(engine.world, mouseConstraint);

window.addEventListener('resize', function() {
render.canvas.width = window.innerWidth;
render.canvas.height = window.innerHeight;
Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight - 20 });
Matter.Body.setVertices(ground, Matter.Vertices.fromPath(`0,0 ${window.innerWidth},0 ${window.innerWidth},40 0,40`));
});

Engine.run(engine);
Render.run(render);