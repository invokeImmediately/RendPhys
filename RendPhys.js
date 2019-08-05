// RendPhys: HTML5 + CSS + JS based renderer for the visualization of simulated physics phenomena.
var RendPhys = RendPhys || {};

RendPhys.Renderer = ( function ( $ ) {
	class Renderer() {
		// TODO: Finish writing class which serves as an interface to a canvas element that will render physics elements.
	}

	return Renderer;
} )( jQuery );

RendPhys.Point2D = ( function() {
	const p2D_Defaults = {
		x: 0,
		y: 0
	};

	class Point2D {
		constructor( params ) {
			// Safely set the value of x.
			if ( typeof x !== 'number' ) {
				x = p2D_Defaults.x;
			}
			this.x = x;

			// Safely set the value of y.
			if ( typeof y !== 'number' ) {
				x = p2D_Defaults.x;
			}
			this.y = y;
		}

		add( p2D ) {
			this.x += p2D.x;
			this.y += p2D.y;

			return this;
		}

		subtract( p2D ) {
			this.x -= p2D.x;
			this.y -= p2D.y;

			return this;
		}
	}

	return Point2D;
} )();

RendPhys.Vector2D = ( function() {
	const v2D_Defaults = {
		magnitude: new DcrMath.Point2D( 0, 0 )
	}

	class Vector2D {
		constructor( params ) {
			try {
				if ( typeof params !== 'object' ) {
					throw new TypeError( 'I was not passed an object as expected.' )
				}
				let propsList = Object.getOwnPropertyNames( params );
				if ( propsList.length < 2 ||  )
			} catch ( err ) {
				console.log( 'An instance of ' + this.constructor.name +
					' encountered the following ' + err.name + ' : ' + err.message );
			}
			// if ( magnitude instanceof DcrMath.Point2D) {
			// 	this.magnitude = magnitude;
			// 	this.angle = undefined; // TODO: Calculate
			// 	this.vertex = undefined; // TODO: Calculate
			// } else {
			// 	console.log( 'Nope! Reverting to defaults.' )
			// }
		}
	};

	return Vector2D;
} )();


RendPhys.Circle2D {
	
}

class Taco {
	constructor() {
		this.type = "Al Pastor";
		this.clName = this.constructor.name;
    }
}
var foodItem = new Taco();
console.log( foodItem.type + ' ' + foodItem.clName );