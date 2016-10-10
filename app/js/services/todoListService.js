'use strict';
app.factory("todoListService", function($http,$q){

	function addItem(itemName){
		var itemObj = {};
		itemObj.name = itemName;
		return sendData(itemObj);
	} 

	function sendData(itemObj){
		var request = $http({
			url:'/items',
			method:'POST',
			data:itemObj	
		});

		return sendRequest(request);
	}

	function sendRequest(config){
		var deferred = $q.defer();
		
		config.then(function(response){
			deferred.resolve(response);

		},function(error){
			deferred.reject(error);
		})

		return deferred.promise;

	}

	function getTodoList(){
		var request = $http({
			url:'items',
			method:'GET'
		});
		return sendRequest(request);
	} 


	return {
		addItem:addItem,
		getTodoList:getTodoList
	}

})