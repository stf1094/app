/**
 * @author William Westgroves
 * Utility class for retrieving local project data.
 */
var getLocalProjectData = {
	getLocalProjectData : function(module) {
		var data = [];
		//Ti.API.info('Retrieve project file: ' + module);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, module + ".json");
		try {
			if (f.exists()) {

				projectData = JSON.parse(f.read());

				iterateJSONNodesToPushToCollection(module, projectData);
				//var stringToPush = String(contents);
				if (module === 'nnProjectContacts') {
					Ti.API.info('Project output: ' + module + ' as a project: ' + f.read());
				}

			} else {
				Ti.API.info('No file on init for: ' + module);
				switch(module) {
				case 'nnProject':
					Alloy.Globals.nnProject = [];
					break;
				case 'nnGoals':
					Alloy.Globals.nnGoals = [];
					break;
				case 'nnProjectContacts':
					Alloy.Globals.nnProjectContacts = [];
					break;
				case 'nnProjectContactNumberPerDay':
					Alloy.Globals.nnProjectContactsPerDay = [];
					break;
				case 'nnProjectContactsYes':
					Alloy.Globals.nnProjectContactsYes = [];
					break;
				case 'nnProjectContactsNo':
					Alloy.Globals.nnProjectContactsNo = [];
					break;
				case 'nnContactsNumberForGoal':
					Alloy.Globals.nnContactsNumberForGoal = [];
					break;
				default:
					return [];
				}
			}
		} catch (err) {
			Ti.API.info('Error on init for: ' + module);
			switch(module) {
			case 'nnProject':
				Alloy.Globals.nnProject = [];
				break;
			case 'nnGoals':
				Alloy.Globals.nnGoals = [];
				break;
			case 'nnProjectContacts':
				Alloy.Globals.nnProjectContacts = [];
				break;
			case 'nnProjectContactNumberPerDay':
				Alloy.Globals.nnProjectContactsPerDay = [];
				break;
			case 'nnProjectContactsYes':
				Alloy.Globals.nnProjectContactsYes = [];
				break;
			case 'nnProjectContactsNo':
				Alloy.Globals.nnProjectContactsNo = [];
				break;
			case 'nnContactsNumberForGoal':
				Alloy.Globals.nnContactsNumberForGoal = [];
				break;
			default:
				return [];
			}
		}
	}
};

module.exports = getLocalProjectData;

function iterateJSONNodesToPushToCollection(module, data) {

	switch(module) {
	case 'nnProject':
		for (var i = 0,
		    l = data.length; i < l; i++) {
			if (data[i] != null) {
				var pm = require('projectManagerInitOnLoad');
				pm.addProjectOnInit(data[i].projectName);
				pm = null;
			}
		}
		break;
	case 'nnGoals':
		for (var i = 0,
		    l = data.length; i < l; i++) {
			if (data[i] != null) {
				var pm = require('projectManagerInitOnLoad');
				pm.addGoalsOnInit(data[i].projectName, data[i].goalName, data[i].goalDesc, data[i].startDate, data[i].endDate, data[i].numberOfContacts);
				pm = null;
			}
		}
		break;
	case 'nnProjectContacts':
		for (var i = 0,
		    l = data.length; i < l; i++) {
			if (data[i] != null) {
				var pm = require('projectManagerInitOnLoad');
				pm.addProjectContactsOnInit(data[i].projectName, data[i].fullName, data[i].contactUUID, data[i].contactJSON);
				pm = null;
			}
		}
		break;
	case 'nnProjectContactNumberPerDay':
		for (var i = 0,
		    l = data.length; i < l; i++) {
			if (data[i] != null) {
				var pm = require('projectManagerInitOnLoad');
				pm.addProjectContactsNumberPerDayOnInit(data[i].projectName, 0);
				//data[i].numberOfDailyContacts);
				pm = null;
			}
		}
		break;
	case 'nnProjectContactsYes':
		for (var i = 0,
		    l = data.length; i < l; i++) {
			if (data[i] != null) {
				var pm = require('projectManagerInitOnLoad');
				pm.addYesProjectContactsOnInit(data[i].projectName, data[i].fullName, data[i].contactUUID, data[i].contactJSON);
				pm = null;
			}
		}
		break;

	case 'nnProjectContactsNo':
		for (var i = 0,
		    l = data.length; i < l; i++) {
			if (data[i] != null) {
				var pm = require('projectManagerInitOnLoad');
				pm.addNoProjectContactsOnInit(data[i].projectName, data[i].fullName, data[i].contactUUID, data[i].contactJSON);
				pm = null;
			}
		}

		break;
	case 'nnContactsNumberForGoal':
		for (var i = 0,
		    l = data.length; i < l; i++) {
			if (data[i] != null) {
				var pm = require('projectManagerInitOnLoad');
				pm.addContactsNumberForGoalOnInit(data[i].projectName, data[i].contactsNumberForGoal);
				pm = null;
			}
		}

		break;
	default:

	}

}
