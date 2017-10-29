if(process.env.NODE_ENV === 'production'){
	//we are in prodction return the prood set of keys
}else{
	//we are in development return the dev keys
	module.exports = require('./dev');
}
