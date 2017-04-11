angular.module('bioinfo.directives', []).directive('myDocumentClick', ['$window', '$document', '$log',
	function($window, $document, $log) {
		return {
			restrict: 'A',
			scope : '=',
			link: function(scope, element, attrs) {
				$document.bind('click', function(event) {
					//check if clicked element is path and get id of parent element (segment-id)	
					try{ 
						if(event.target.nodeName == "path"){
						    scope.$apply(function(){
								//lets call function to show path nodes
								scope.showPathNodes(String(event.target.parentNode.parentNode.id).replace('r', ''), String(event.target.parentNode.id).replace('s', ''));
							});
						};
					}catch(err){
					//do nothing
					}
				})
			}
		};
	}
])


