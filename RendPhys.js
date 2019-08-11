// RendPhys: HTML5 + CSS + JS based renderer for the visualization of simulated physics phenomena.
var RendPhys = RendPhys || {};

RendPhys.findProp = function( obj, prop ) {
	let result = false;
	if ( typeof prop === 'string' ) {
		result = obj.find( function( elem ) {
			return elem === 'formContainer';
		} );
	} else {
		throw new TypeError( "RendPhys.findProp was passed a parameter for the property to search f\
or that wasn't typed as a string." );
	}

	return result;
};

RendPhys.Renderer = ( function ( $, rp ) {
	class Renderer {
		// TODO: Finish writing class which serves as an interface to a canvas element that will render physics elements.
	}

	return Renderer;
} )( jQuery, RendPhys );

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

RendPhys.Vector2D = ( function( rp ) {
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
				if ( propsList.length !== 2 ) {
					throw new TypeError( 'I was not passed object containing the correct number of \
properties representing my parameters.' );
				}
				if ( rp.findProp( params, 'magnitude' ) && rp.findProp( params, 'direction' ) ) {
					this._magnitude = params.magnitude;
					this._direction = params.direction;
					this._x = params.magnitude * Math.cos( this.direction );
					this._y = params.magnitude * Math.sin( this.direction );
				} else if ( rp.findProp( params, 'x' ) && rp.findProp( params, 'y' ) ) {
					this._x = params.x;
					this._y = params.y;
					this._magnitude = Math.sqrt( this.x ** 2 + this.y ** 2 );
					this._angle = Math.atan2 ( this._y, this._x );
				} else {
					throw new TypeError( 'I was not passed object containing appropriate parameters\
 from which a vector could be represented.' );
				}
			} catch ( err ) {
				console.log( 'An instance of ' + this.constructor.name +
					' encountered the following ' + err.name + ' : ' + err.message );
			}
		}
	};

	// TODO: Write getters & setters for magnitude, direction, x, and y.

	// TODO: Write operator functions.

	return Vector2D;
} )( RendPhys );


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