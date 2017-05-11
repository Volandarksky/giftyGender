'use strict';

var w2v = require( '/home/kk/node_modules/word2vec/lib' );

w2v.loadModel( __dirname + '/home/kk/sex/w2v/output/vec/vec.txt', function( err, model ) {
	console.log( model );

	var wordVecs = model.getVectors( [ 'Hamlet', 'daughter' ] );
	console.log( model.getNearestWord( wordVecs[0].values, 1 ) );

	var similar = model.mostSimilar( 'dead', 20 );
	console.log( similar );

	var analogy = model.analogy( 'mother',[ 'Hamlet', 'father' ], 10 );
	console.log( analogy );

	var similarity = model.similarity( 'father', 'mother' );
	console.log( similarity );
});
