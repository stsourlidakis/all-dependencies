const projectDir = '../..';
const thisPackage = require(`${projectDir}/package.json`);
let dependencies = [];
let missingDependencies = [];

module.exports = function(){
	generateData()
	return {
		dependencies,
		missing: missingDependencies
	};
}

module.exports.list = function(){
	generateData()
	return dependencies;
}

module.exports.missing = function(){
	generateData()
	return missingDependencies;
}

function generateData(){
	// clear the arrays
	dependencies = [];
	missingDependencies = [];

	parsePackage(thisPackage);	//start recursively parsing the dependencies
	dependencies.shift();	//remove the main project from the dependency list
}

function parsePackage(package){
	if(dependencies.includes(package.name))return;	// skip parsed packages

	dependencies.push(package.name);	// save the package name
	
	// don't try to go deeper if the package has no dependencies
	if(typeof package.dependencies==='undefined')return;
	
	// get dependencies
	const packageDependencies = Object.keys(package.dependencies);
	for(let dependency of packageDependencies){	// loop through dependencies
		try{	// require will throw an error if a package is missing from node_modules
			// parse the dependency as a package
			parsePackage(require(`${projectDir}/node_modules/${dependency}/package.json`));
		} catch(err) {
			// log the missing dependency
			if(!missingDependencies.includes(dependency))missingDependencies.push(dependency);
		}
	}
}
