'use strict';

var w2v = require( '/home/kk/node_modules/word2vec/lib' );

w2v.word2phrase( __dirname + '/input/man.txt', __dirname + '/output/phrases/phrases.txt', {
	threshold: 5, //количество фраз
	debug: 2,//режим отладки
	minCount: 2
	//отбрасывать слова, которые появляются меньше, чем minCount раз
});
w2v.word2vec( __dirname + '/output/phrases/phrases.txt', __dirname
							+ '/output/vec/vec.json', {
	cbow: 1,
	size: 200,
	window: 8,
	negative: 25,
	hs: 0,
	sample: 1e-4,
	threads: 20,
	iter: 15,
	minCount: 2
});
