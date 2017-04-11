angular.module('bioinfo.controllers', []).

/* base controller */
controller('bioinfoCtrl', function($scope, escher, $dialog) {
	//uncomment to load test data
	//escher.renderPathway();
	
	$scope.showNodeInfo = false;
	
	
	$scope.clearData = function(){
		$('#map_container').html("");
	}
	
	$scope.changeColor = function(){
		var color = $scope.toggleValue ? "green":"#DCDCDC";
		$(".segment").css("stroke", color);
	}
	
	$scope.loadJSON = function(files){
		//service loads escher pathway and return uploaded data url (blob) for later data manipolaiton - pobably not the best idea for large data sets
		$scope.dataURL = escher.renderPathway(files);
		//parse data from json in blob to js object
		$.getJSON($scope.dataURL, function(data) {
			$scope.dataObject = angular.fromJson(data);
			
			//calc statistics
			getStatistics();
		});
	}
	
	function getStatistics(){
		$scope.statistics ={"nodeTypes":{}, "genes":{}};
		
		//NODE TYPES
		angular.forEach($scope.dataObject[1]["nodes"], function(node, nodeId) {
			//basic version - basic object {node_type:number,...} - not in use
			//$scope.statistics["nodeTypes"][node["node_type"]] = $scope.statistics["nodeTypes"][node["node_type"]] === undefined ? 1 : $scope.statistics["nodeTypes"][node["node_type"]] + 1;
			
			//advance version - also get molecules by name and nuber of it for each node type
			$scope.curNodeType = $scope.statistics["nodeTypes"][node["node_type"]];
			var nodeName = node["name"];
			if($scope.curNodeType === undefined){
				$scope.curNodeType = {"molecules":{nodeName:1}, "numberOfNodeTypes" : 1};
			}else{
				$scope.curNodeType["numberOfNodeTypes"] += 1;
				if($scope.curNodeType["molecules"][nodeName] === undefined){
					$scope.curNodeType["molecules"][nodeName] = 1;		
				}else{
					$scope.curNodeType["molecules"][nodeName] += 1;
				}
			}
			
			$scope.statistics["nodeTypes"][node["node_type"]] = $scope.curNodeType;
		});
		
		
		//REPEATING GENES
		angular.forEach($scope.dataObject[1]["reactions"], function(reaction, reactionId) {
			angular.forEach(reaction["genes"], function(gene) {
				$scope.statistics["genes"][gene["name"]] = $scope.statistics["genes"][gene["name"]] === undefined ? 1 : $scope.statistics["genes"][gene["name"]] + 1;
			});
		});
		
		//remove genes which express only in one reaction
		angular.forEach($scope.statistics["genes"], function(number, geneName) {
			if(number == 1) delete $scope.statistics["genes"][geneName];
		});
	}
	
	
	$scope.pathNodesIds = {};
	$scope.showMolecules = function(nodeTypeName){
		$scope.pathNodesIds[nodeTypeName] = $scope.pathNodesIds[nodeTypeName] == true ? false : true;
	}
	
	
	$scope.showPathNodes = function(reactionId, segmentId){
		console.log("Reaction id: " + reactionId + " Segment id: " + segmentId)
		try{
			var segment = $scope.dataObject[1]["reactions"][reactionId]["segments"][segmentId];
			$scope.nodeFromId = segment["from_node_id"];
			$scope.nodeToId = segment["to_node_id"];
			
			$scope.nodeFromName = $scope.dataObject[1]["nodes"][$scope.nodeFromId]["name"] || "Name not avalible";
			$scope.nodeToName = $scope.dataObject[1]["nodes"][$scope.nodeToId]["name"] || "Name not avalible";
			$scope.showNodeInfo = true;
		}catch(err){
			$scope.showNodeInfo = false;
			//something went wrong while reading json - should throw some exception in production
		}
	}
})


var ModalInstanceCtrl = function($scope, $modalInstance, $modal, item) {
    
     $scope.item = item;
    
      $scope.ok = function () {
        $modalInstance.close();
      };
      
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
}
