'use strict';

var w2v = require( '/home/kk/node_modules/word2vec/lib' );

w2v.loadModel( __dirname + '/home/kk/sex/w2v/output/vec/vec.txt', function( err, model ) {
	var wordVecs = model.getVectors( [ 'Hamlet', 'father', 'king' ] );
	var result = wordVecs[0]
		.subtract( wordVecs[1] )
		.add( wordVecs[2] );

	console.log( model.getNearestWords(result, 10 ) );
});
