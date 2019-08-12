/*!*************************************************************************************************
 * RendPhys.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: HTML5 + CSS + JS based renderer for the visualization of simulated physics phenomena.
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 *
 * REPOSITORY: https://github.com/invokeImmediately/RendPhys
 *
 * LICENSE: ISC - Copyright (c) 2019 Daniel C. Rieck.
 *
 *   Permission to use, copy, modify, and/or distribute this software for any purpose with or
 *   without fee is hereby granted, provided that the above copyright notice and this permission
 *   notice appear in all copies.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 *   SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL
 *   DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 *   DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
 *   CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *   PERFORMANCE OF THIS SOFTWARE.
 **************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
//   §1: Script dependencies..................................................................42
//     §1.1: Namespace declaration............................................................45
//   §2: Utility functions....................................................................50
//     §2.1: RendPhys.findProp................................................................53
//     §2.2: RendPhys.degToRad................................................................70
//     §2.3: RendPhys.radToDeg................................................................89
//   §3: Renderer interface..................................................................108
//     §3.1: RendPhys.Renderer...............................................................111
//   §4: Physics abstractions................................................................122
//     §4.1: RendPhys.Circle2D...............................................................125
//     §4.2: RendPhys.Point2D................................................................132
//     §4.3: RendPhys.Vertex2D...............................................................174
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Script dependencies

//////////////////////////////////////////////////
// §1.1: Namespace declaration

var RendPhys = RendPhys || {};

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Script dependencies

//////////////////////////////////////////////////
// §2.1: RendPhys.findProp

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

//////////////////////////////////////////////////
// §2.2: RendPhys.degToRad

RendPhys.degToRad = function( angle ) {
	let result = undefined;

	try {
		if ( typeof angle === 'number' ) {
			result = angle * Math.PI / 180;
		} else {
			throw new TypeError( 'RendPhys.degToRad was passed a value that was not a number.' );
		}
	} catch( err ) {
		console.log( err.message );
	}

	return result;
}

//////////////////////////////////////////////////
// §2.3: RendPhys.radToDeg

RendPhys.radToDeg = function( angle ) {
	let result = undefined;

	try {
		if ( typeof angle === 'number' ) {
			result = angle * 180 / Math.PI;
		} else {
			throw new TypeError( 'RendPhys.radToDeg was passed a value that was not a number.' );
		}
	} catch( err ) {
		console.log( err.message );
	}

	return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Renderer interface

//////////////////////////////////////////////////
// §3.1: RendPhys.Renderer

RendPhys.Renderer = ( function ( $, rp ) {
	class Renderer {
		// TODO: Finish writing class which serves as an interface to a canvas element that will render physics elements.
	}

	return Renderer;
} )( jQuery, RendPhys );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §4: Physics abstractions

//////////////////////////////////////////////////
// §4.1: RendPhys.Circle2D

RendPhys.Circle2D = ( function( rp ) {
	// TODO: Finish writing class
} )( RendPhys );

//////////////////////////////////////////////////
// §4.2: RendPhys.Point2D

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

//////////////////////////////////////////////////
// §4.3: RendPhys.Vector2D

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
