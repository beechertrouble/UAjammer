UAjammer
========

User Agent based browser detection, os detection, also pixel density, etc

- fires immediately
- no jquery dependancy
- adds classes to the html element
- accessible via the global var _UAjammer

ARGS
-----------
you can add these optional your dom before adding the UAjammer
```javascript 
var _uajArgs = { 
	immediately : false, // defaults to true
	nameSpace : '_whatever_', // defaults to _ua_
	addClasses : false // defaults to true
};
```

METHODS
-----------
```javascript 
// only necessary if you've set the 'immediately' to false
_UAjammer.init(); 

/**
* isLt, isLte, isGt, isGte :
* arg = integer or float
* returns bool
*/
var test_version = 20; // or whatever integer or float
_UAjammer.isLt(test_version);
_UAjammer.isLte(test_version);
_UAjammer.isGt(test_version);
_UAjammer.isGte(test_version);
```

TO DO
-----------
- revisit os versions for windows and linux and android ?
- android native browser detected as safari ...
- revisit ie7 ?
