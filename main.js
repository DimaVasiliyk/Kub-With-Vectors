class Square{
	element;
	height;
	width;
	position = new Vector(0,0);
	velocity = new Vector(0,0);
	forces = [];
	constructor(element){
		let rect = element.getBoundingClientRect()
		this.width = rect.width;
		this.height = rect.height;
		this.element = element;
	}

}


class Vector{
	x;
	y;
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	
	add(v2){
		this.x += v2.x;
		this.y += v2.y;
	}
	static add(v1, v2){
		return new Vector(
			v1.x + v2.x,
			v1.y + v2.y,
		);
	}
}

		let sliderDegree = document.getElementById("degree");
		let outputDegree = document.getElementById("degree-input");
		outputDegree.innerHTML = sliderDegree.value;

		sliderDegree.oninput = function() {
			outputDegree.innerHTML = this.value;
		}

		let sliderForce = document.getElementById("force");
		let outputForce = document.getElementById("force-input");
		outputForce.innerHTML = sliderForce.value;

		sliderForce.oninput = function() {
			outputForce.innerHTML = this.value;
		}

		let greenElement = document.querySelector(".green") 
		let greyElement = document.querySelector(".grey") 
		let wrapp = document.querySelector(".edge") 
		// let box = new Square(greenElement)
		// let box = new Square(greyElement)
		let g = new Vector(0,10)


		function step(i = 0) {
			
			if(i === 0){
				// world initialization
				const x = (parseInt(sliderForce.value))
				const y = (parseInt(sliderDegree.value))

				box.velocity = new Vector (x,y);
				box.position = new Vector(0,200);
			}

			// lifecycle
			// get and add forces
			box.forces.push(g);
			box.forces.forEach(f => box.velocity.add(f));
			box.forces = [];

			// apply constraints

			// max x - 1200
			if(box.position.x + box.velocity.x + box.width > 1200){
				console.log('Constraint X:', box.position.x + box.velocity.x + box.width, box.velocity.x);
				box.velocity.x = 1200 - box.position.x - box.width;
				box.velocity.y *= 0.9
				console.log('After constraint X:', box.position.x + box.velocity.x + box.width, box.velocity.x);
			} 
			// max y - 900
			console.log('Y:', box.position.y + box.velocity.y + box.height, box.velocity.y);
			if(box.position.y + box.velocity.y + box.height > 500){
				console.log('Constraint Y:', box.position.y + box.velocity.y + box.height, box.velocity.y );
				box.velocity.y = 500 - box.position.y - box.height;
				box.velocity.x *= 0.9
				console.log('After constraint Y:', box.position.y + box.velocity.y + box.height, box.velocity.y );
			} 

			// apply velocity

			box.position.add(box.velocity);

			// render
			box.element.style = `transform:translate(${box.position.x}px,${box.position.y}px )`
		

				 requestAnimationFrame(() => step(++i));
		}



document.querySelector(".start-white").addEventListener('click',() => step())
document.querySelector(".start-grey").addEventListener('click',() => step())




