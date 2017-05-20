function init() {
}

function addProject(){

	
	Alloy.Globals.Navigator.open("projectWizardEdit", {
		restrictToFavorites : false,
		title : "Projects",
		displayHomeAsUp : true
	});
	
}
