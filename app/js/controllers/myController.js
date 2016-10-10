app.controller("myController",function($scope,todoListService){
	
	$scope.flag = true;
	// when some value gets added, add to the list

	$scope.myTodoList = [];
	$scope.init = function(){
		$scope.getTodoList();
	}
	$scope.addItem = function(itemName){
		todoListService.addItem(itemName).then(
			function(response){
				var result = response.data;

				console.log(result.name);
			}, function(error){
				console.log("Error: "+error);
			});
		$scope.flag = false;
	}

	$scope.getTodoList = function(){
		todoListService.getTodoList().then(
			function(response){
				var items = response.data;
				for(var i = 0; i < items.length; i++){

					console.log(items[i]);
				}

			}, function(error){

				console.log("Error: "+error);
			})
		
	}

	$scope.init();

})
//when one item is added, make the flag true to display all buttons

app.directive("myEnter",function(){
	console.log("i am in directive");
	return function(scope,element,attrs){
		element.bind("keydown keypress",function(event){
			
			if(event.which === 13){
				scope.$apply(function(){
					scope.$eval(attrs.myEnter);
				});
				
				event.preventDefault();

			}
		})
	}
})