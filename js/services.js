angular.module('bioinfo.services', []).service('escher', function() {
	
	
	this.loadData = function(dataPath){
		
	}
	
	this.renderPathway = function(files){
		//create temp path for file 
		//first run - load example data
		var tmppath = files?URL.createObjectURL(files[0]):'e_coli.iJO1366.central_metabolism.json';
		d3.json(tmppath, function(error, data) {
			if (error){
				alert("Error loading JSON file.");
			}else{
				var options = {  menu: 'none', fill_screen: false, scroll_behavior:"zoom", gene_data:true};
				var b = escher.Builder(data, null, "", d3.select('#map_container'), options);
			}
		});
		
		return tmppath;
	}
});