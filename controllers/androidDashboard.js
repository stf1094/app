 var onInitLoad = function onOpen(e) {
	if (Alloy.Globals.dataPostedToKatana == false) {
		var isTablet = Alloy.Globals.osname === 'iphone' || (Alloy.Globals.osname === 'android' ) || (Alloy.Globals.osname === 'ipad' );
		Ti.API.info('Check dataPostedToKatana conditional in init ' + Alloy.Globals.dataPostedToKatana);
		if (isTablet) {
			if (Alloy.Globals.NetworkNinjaUUID.length > 0) {
				Alloy.Globals.dataPostedToKatana == true;
				var mngPerms = require('managePermissions');
				mngPerms.getPermissionForContacts();
			}
		}
	}
	var kat = require('getKatana');
	if (kat.callKatana() == true) {
		Ti.API.info('Check katanaContacted conditional in init ' + Alloy.Globals.katanaContacted);
		Ti.API.info('kat.callKatana() true ');
		Ti.App.fireEvent("refresh-data", {});
	};
}; 

function init() {

	


}



function openMasterDirectory() {
	Alloy.Globals.Navigator.open("directory", {
		restrictToFavorites : false,
		title : "Master Contact List",
		displayHomeAsUp : true
	});
}


function openProjectMain() {
	Alloy.Globals.Navigator.open("projects", {
		restrictToFavorites : false,
		title : "Projects",
		displayHomeAsUp : true
	});
}
function openHotLists() {
	Alloy.Globals.Navigator.open("hot-list", {
		restrictToFavorites : false,
		title : "Hot List",
		displayHomeAsUp : true
	});
}
function openReports() {
	Alloy.Globals.Navigator.open("start", {
		restrictToFavorites : false,
		title : "Reporting",
		displayHomeAsUp : true
	});
}


function onBookmarkClick() {

}

function onRefreshClick() {

}

Ti.App.addEventListener("openMasterDirectory", function(e) {
	Alloy.Globals.Navigator.open("directory");
});

init();

