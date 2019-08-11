// RendPhys: HTML5 + CSS + JS based renderer for the visualization of simulated physics phenomena.
var RendPhys = RendPhys || {};

RendPhys.findProp = function( obj, prop ) {
	let result = false;
	if ( typeof prop === 'string' ) {
		result = obj.find( function( elem ) {
			return elem === prop;
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
	// TODO: Finish implementing

	// const v2D_Defaults = {
	// 	magnitude: new DcrMath.Point2D( 0, 0 )
	// }

	function calcDistAndMag( v2dInst ) {
		v2dInst._magnitude = Math.sqrt( v2dInst.x ** 2 + v2dInst.y ** 2 );
		v2dInst._direction = Math.atan2 ( v2dInst._y, v2dInst._x );
	}

	function calcXAndY( v2dInst ) {
		v2dInst._x = v2dInst.magnitude * Math.cos( v2dInst.direction );
		v2dInst._y = v2dInst.magnitude * Math.sin( v2dInst.direction );		
	}

	class Vector2D {
		constructor( params ) {
			try {
				if ( typeof params !== 'object' ) {
					throw new TypeError( 'I was not passed an object as expected.' )
				}
				let propNames = Object.getOwnPropertyNames( params );
				if ( propNames.length !== 2 ) {
					throw new TypeError( 'I was not passed object containing the correct number of \
						properties representing my parameters.' );
				}
				if (
					rp.findProp( propNames, 'magnitude' ) &&
					rp.findProp( propNames, 'direction' )
				) {
					this._magnitude = params.magnitude;
					this._direction = params.direction;
					calcXAndY( this );
				} else if (
					rp.findProp( propNames, 'x' ) &&
					rp.findProp( propNames, 'y' )
				) {
					this._x = params.x;
					this._y = params.y;
					calcDistAndMag( this );
				} else {
					throw new TypeError( 'I was not passed object containing appropriate parameters\
						 from which a vector could be represented.' );
				}
			} catch ( err ) {
				console.log( 'An instance of ' + this.constructor.name +
					' encountered the following ' + err.name + ' : ' + err.message );
			}
		}

		get direction() {
			return this._direction;
		}

		get magnitude() {
			return this._magnitude;
		}

		get x() {
			return this._x;
		}

		get y() {
			return this._y;
		}

		logSelf() {
			console.log( 'Instance of ' + this.constructor.name + ":", this );
		}

		set direction( val ) {
			this._direction = val;
			calcXAndY( this );
		}

		set magnitude( val ) {
			this._magnitude = val;
			calcXAndY( this );
		}

		set x( val ) {
			this._x = val;
			calcDistAndMag( this );
		}

		set y( val ) {
			this._x = val;
			calcDistAndMag( this );
		}

		// TODO: Write operator functions.
	};

	return Vector2D;
} )( RendPhys );


RendPhys.Circle2D = ( function( rp ) {
	
} )( RendPhys );
