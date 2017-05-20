// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//

//Set the global for environment ('LOCAL','QA','PROD')
Alloy.Globals.KatanaEnvironment = 'QA';

// Set the default contact info to UNKNOWN so app does not blow up.
var gld = require('getLocalData');
Alloy.Globals.katanaContacts = gld.getLocalData('localContacts');
gld = null;
Alloy.Globals.userIdentityFromKatana = "";
Alloy.Globals.entityFromKatanaAutenticated = false;
Alloy.Globals.faceBookContacts = '';
Alloy.Globals.faceBookContacted = false;
Alloy.Globals.katanaContacted = false;
Alloy.Globals.bookmarkDefault = false;
Alloy.Globals.dataPostedToKatana = false;
Alloy.Globals.katanaAPIServiceRunning = false;
Alloy.Globals.osname = Ti.Platform.osname;

//init();

Alloy.Globals.Identity = "";
Alloy.Globals.AccountHolderName = "";
Alloy.Globals.NetworkNinjaUUID = "";
Alloy.Globals.CustomerID = -1;
Alloy.Globals.FBUserID = -1;
Alloy.Globals.FBUserName= "";
Alloy.Globals.DebugOn = false;
Alloy.Globals.accessToken = "EAACEdEose0cBAOAthgdbUu5yNc5d3ZCCJDKRflWYP2AoZAZApZCOVoEYG4QYr54D7s4iaJtoTaTylXx8UJbWXiG4rO4QVc3v20ZBbi225sHn9BGRpJe7kFtVF23mhmUFfCNOFHZC33l74ftWazcVAuEGc04cgoGeMH8yOx9cLuigZDZD";
Alloy.Globals.loginCount = 0;

//Used for project managment
Alloy.Globals.nnTotalMasterContactList = 0;
Alloy.Globals.nnProject = [];
Alloy.Globals.nnGoals = [];
Alloy.Globals.nnTasks = [];
Alloy.Globals.nnProjectContacts = [];
Alloy.Globals.nnProjectContactsPerDay = [];
Alloy.Globals.nnProjectContactsYes = [];
Alloy.Globals.nnProjectContactsNo = [];
Alloy.Globals.nnProjectContactNumberPerDay = [];
Alloy.Globals.nnContactsNumberForGoal = [];

//Used for project init on load
Alloy.Globals.nnProjectInit = [];
Alloy.Globals.nnGoalsInit = [];
Alloy.Globals.nnTasksInit = [];
Alloy.Globals.nnProjectContactsInit = [];
Alloy.Globals.nnProjectContactsPerDayInit = [];
Alloy.Globals.nnProjectContactsYesInit = [];
Alloy.Globals.nnProjectContactsNoInit = [];
Alloy.Globals.nnProjectContactNumberPerDayInit = [];
Alloy.Globals.nnContactsNumberForGoalInit = [];

//Retrieve local project info...
//
//Remove old data
//var rmpd = require('projectManager');
//rmpd.wipeAllProjects();
//rmpd = null;

Ti.API.info('Retrieve local project');
try {
	var glp = require('getLocalProjectData');
	glp.getLocalProjectData('nnProject');
	glp.getLocalProjectData('nnGoals');
	glp.getLocalProjectData('nnProjectContacts');
	glp.getLocalProjectData('nnContactsNumberForGoal');
	glp.getLocalProjectData('nnProjectContactNumberPerDay');
	glp.getLocalProjectData('nnProjectContactsYes');
	glp.getLocalProjectData('nnProjectContactsNo');
	glp = null;
	//if success...
	Alloy.Globals.nnProject = Alloy.Globals.nnProjectInit;
	Alloy.Globals.nnGoals = Alloy.Globals.nnGoalsInit;
	Alloy.Globals.nnTasks = Alloy.Globals.nnTasksInit;
	Alloy.Globals.nnProjectContacts = Alloy.Globals.nnProjectContactsInit;
	Alloy.Globals.nnProjectContactsPerDay = Alloy.Globals.nnProjectContactsPerDayInit;
	Alloy.Globals.nnProjectContactsYes = Alloy.Globals.nnProjectContactsYesInit;
	Alloy.Globals.nnProjectContactsNo = Alloy.Globals.nnProjectContactsNoInit;
	Alloy.Globals.nnProjectContactNumberPerDay = Alloy.Globals.nnProjectContactNumberPerDayInit;
	Alloy.Globals.nnContactsNumberForGoal = Alloy.Globals.nnContactsNumberForGoalInit;
	// release data in init vars
	Alloy.Globals.nnProjectInit = [];
	Alloy.Globals.nnGoalsInit = [];
	Alloy.Globals.nnTasksInit = [];
	Alloy.Globals.nnProjectContactsInit = [];
	Alloy.Globals.nnProjectContactsPerDayInit = [];
	Alloy.Globals.nnProjectContactsYesInit = [];
	Alloy.Globals.nnProjectContactsNoInit = [];
	Alloy.Globals.nnProjectContactNumberPerDayInit = [];
	Alloy.Globals.nnContactsNumberForGoalInit = [];

} catch(e) {
	alert('Contact support.');
	Alloy.Globals.nnProject = [];
	Alloy.Globals.nnGoals = [];
	Alloy.Globals.nnTasks = [];
	Alloy.Globals.nnProjectContacts = [];
	Alloy.Globals.nnProjectContactsPerDay = [];
	Alloy.Globals.nnProjectContactsYes = [];
	Alloy.Globals.nnProjectContactsNo = [];
	Alloy.Globals.nnProjectContactNumberPerDay = [];
	Alloy.Globals.nnContactsNumberForGoal = [];
}

//Setup globals for environments.
if (Alloy.Globals.KatanaEnvironment === 'QA') {
	Alloy.Globals.KatanaPathURL = 'http://ec2-52-73-4-91.compute-1.amazonaws.com:8080/katana/';
} else if (Alloy.Globals.KatanaEnvironment === 'LOCAL') {
	Alloy.Globals.KatanaPathURL = 'http://localhost:8080/katana/';
} else if (Alloy.Globals.KatanaEnvironment === 'PROD') {
	Alloy.Globals.KatanaPathURL = 'http://ec2-52-73-4-91.compute-1.amazonaws.com:8080/katana/';
} else {
	Alloy.Globals.KatanaPathURL = 'http://ec2-52-73-4-91.compute-1.amazonaws.com:8080/katana/';
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


 
