'use strict';

var w2v = require( '/home/kk/node_modules/word2vec/lib' );

w2v.word2phrase( __dirname + '/input/man.txt', __dirname + '/output/phrases/phrases.txt', {
	threshold: 5, //количество фраз
	debug: 2,//режим отладки
	minCount: 2
	//отбрасывать слова, которые появляются меньше, чем minCount раз
});
