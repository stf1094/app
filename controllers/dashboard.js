var args = $.args;
var args = [];
var onInitLoad = function onOpen(e) {
	if (Alloy.Globals.katanaContacts ==='{"users":[{"favorite": false,"latitude": 0,"longitude": 0,"photo": "","bubbleParent": true,"email": {},"firstName": "NOT IN SYNC","lastName": "SYSTEM"}]}'){
		alert('NOT POSTED');
		Alloy.Globals.dataPostedToKatana = false;
	}
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

	};
	init();

};

function init() {

	var txtWelcome = $.txtWelcome;
	if (Alloy.Globals.AccountHolderName == '') {
		txtWelcome.text = 'UNKNOWN';
	} else {
		var splitted = Alloy.Globals.AccountHolderName.split(" ");
		txtWelcome.text = splitted[0];
	}

}

function openMasterDirectory() {

	var margs = require('manageArgs');
	args = margs.manageArgs('restrictToFavorites', false, args);
	args = margs.manageArgs('title', 'Master contact list', args);
	args = margs.manageArgs('displayHomeAsUp', true, args);
	margs = null;

	Alloy.Globals.Navigator.open("directory", args);

}

function openProjectMain() {
	var margs = require('manageArgs');
	args = margs.manageArgs('restrictToFavorites', false, args);
	args = margs.manageArgs('title', 'Projects', args);
	args = margs.manageArgs('displayHomeAsUp', true, args);
	margs = null;
	Alloy.Globals.Navigator.open("projects", args);
}

function openHotLists() {
	//alert('Coming soon!');

	//var txtTemp = Ti.UI.createLabel({});
	//var epkr = require('getEventPicker');
	//epkr.getEventPicker($.dashboard, txtTemp);
	//epkr = null;

	//Remove old data
	//var rmpd = require('projectManager');
	//rmpd.wipeAllProjects();
	//rmpd = null;


	/*
	 var margs = require('manageArgs');
	 args = margs.manageArgs('restrictToFavorites', false, args);
	 args = margs.manageArgs('title', 'Hot Lists', args);
	 args = margs.manageArgs('displayHomeAsUp', false, args);
	 margs = null;
	 Alloy.Globals.Navigator.open("hot-list", args);
	 */
	

}

function openReports() {
	//alert('Reporting will be in version 2.0!');
	//Alloy.Globals.Navigator.open("thread");
}

function onBookmarkClick() {

}

function openCalendar() {
	var selectableCalendars = Ti.Calendar.allCalendars;
	if (selectableCalendars.length > 0) {
		var margs = require('manageArgs');
		args = margs.manageArgs('restrictToFavorites', false, args);
		args = margs.manageArgs('title', 'Calendar', args);
		args = margs.manageArgs('displayHomeAsUp', false, args);
		margs = null;
		Alloy.Globals.Navigator.open("calendar", args);
	} else {
		alert('There are no calendars associated with an account on this device. Please go to your local calendar settings and add an account.');
	}
	//var gv = require('manageiOSCalendar');
	//gv.manageiOSCalendar(args, '$.txtPDProjectName.text');
	//gv = null;
}

function onRefreshClick() {

}

function openRecent() {
	//alert('Coming soon!');
	/* var margs = require('manageArgs');
	 args = margs.manageArgs('restrictToFavorites', false, args);
	 args = margs.manageArgs('title', 'Recent', args);
	 args = margs.manageArgs('displayHomeAsUp', false, args);
	 margs = null;
	 Alloy.Globals.Navigator.open("recent", args);
	 */
}

init();

Ti.App.addEventListener('app.refresh-dashboard', function(e) {
	init();
});

Ti.App.addEventListener('app.gotoMasterDirectory', function(e) {
	Alloy.Globals.Navigator.open("directory");
});

//quick actions button 
function showQuickActions() {
	$.quickActions.show();
}


