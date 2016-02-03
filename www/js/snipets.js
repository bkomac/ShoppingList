var airlines = airlines.sort(function(a, b) {

	var airlineA = a.name.toLowerCase();
	var airlineB = b.name.toLowerCase();

	if(airlineA > airlineB) return 1;
	if(airlineA < airlineB) return -1;
	return 0;
});



var searchAirlines = function(searchFilter) {
    
    console.log('Searching airlines for ' + searchFilter);

    var deferred = $q.defer();

    var matches = airlines.filter( function(airline) {
    	if(airline.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
    })

    $timeout( function(){
    
       deferred.resolve( matches );

    }, 100);

    return deferred.promise;

};