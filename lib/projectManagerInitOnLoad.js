/**
 * ProjectManager
 * Utility class for managing application Projects, goals and tasks
 */
var projectManagerInitOnLoad = {

	addProjectOnInit : function _addProjectOnInit(projectName) {
		//Avoid entering duplicate project names
		var projectExists = false;
		if (Alloy.Globals.nnProjectInit.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectInit.length; i++) {
				if (Alloy.Globals.nnProjectInit[i].projectName === projectName) {
					projectExists = true;
				}
			}
		}

		if (projectExists === true) {
			alert('Project:' + projectName + ' already exists.');
			return false;
		} else {
			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			Alloy.Globals.nnProjectInit.push(keyValuePairObj);

			return true;
		}

	},

	addGoalsOnInit : function _addGoalsOnInit(projectName, goalName, goalDesc, startDate, endDate, numberOfContacts) {
		//Avoid duplicates
		var goalExists = false;
		if (Alloy.Globals.nnProjectInit.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnGoalsInit.length; i++) {
				if ((Alloy.Globals.nnGoalsInit[i].projectName === projectName) && (Alloy.Globals.nnGoalsInit[i].goalName === goalName)) {
					goalExists = true;
				}
			}
		}

		if (goalExists === true) {
			alert('Goal:' + goalName + ' already exists for ' + projectName + '.');
			return false;
		} else {

			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			keyValuePairObj['goalName'] = goalName;
			keyValuePairObj['goalDesc'] = goalDesc;
			keyValuePairObj['startDate'] = startDate;
			keyValuePairObj['endDate'] = endDate;
			keyValuePairObj['numberOfContacts'] = numberOfContacts;
			Alloy.Globals.nnGoalsInit.push(keyValuePairObj);

			return true;

		}

	},

	updateGoalsOnInit : function _updateGoalsOnInit(projectName, goalName, goalDesc, startDate, endDate, numberOfContacts) {
		//Find, remove and re-add.
		var goalExists = false;
		if (Alloy.Globals.nnProjectInit.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnGoalsInit.length; i++) {
				if ((Alloy.Globals.nnGoalsInit[i].projectName === projectName) && (Alloy.Globals.nnGoalsInit[i].goalName === goalName)) {
					delete Alloy.Globals.nnGoalsInit[i];
					Alloy.Globals.nnGoalsInit = reindex_array_keys(Alloy.Globals.nnGoalsInit, 0);
				}
			}
		}

		var keyValuePairObj = {};
		keyValuePairObj['projectName'] = projectName;
		keyValuePairObj['goalName'] = goalName;
		keyValuePairObj['goalDesc'] = goalDesc;
		keyValuePairObj['startDate'] = startDate;
		keyValuePairObj['endDate'] = endDate;
		keyValuePairObj['numberOfContacts'] = numberOfContacts;
		Alloy.Globals.nnGoalsInit.push(keyValuePairObj);

		return true;

	},

	//Used to add contacts to the project collection
	addProjectContactsOnInit : function _addProjectContactsOnInit(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContactsInit.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsInit.length; i++) {
				if ((Alloy.Globals.nnProjectContactsInit[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsInit[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsInit[i].contactUUID === contactUUID)) {
					contactExists = true;
					//delete Alloy.Globals.nnProjectContactsInit[i];
					//Alloy.Globals.nnProjectContactsInit = reindex_array_keys(Alloy.Globals.nnProjectContactsInit, 0);
				}
			}
		}

		if (contactExists === true) {
			//alert('Contact:' + fullName + ' already exists for project: ' + projectName + '.');
			return false;
		} else {

			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			keyValuePairObj['contactUUID'] = contactUUID;
			keyValuePairObj['fullName'] = fullName;
			keyValuePairObj['contactJSON'] =  contactJSON;
			keyValuePairObj['preferredEmail'] = '';
			keyValuePairObj['preferredPhone'] = '';

			Alloy.Globals.nnProjectContactsInit.push(keyValuePairObj);

		}

	},

	//Used to add YES contacts to the project collection
	addYesProjectContactsOnInit : function _addYesProjectContactsOnInit(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContactsYesInit.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsYesInit.length; i++) {
				if ((Alloy.Globals.nnProjectContactsYesInit[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsYesInit[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsYesInit[i].contactUUID === contactUUID)) {
					contactExists = true;
					//delete Alloy.Globals.nnProjectContactsYesInit[i];
					//Alloy.Globals.nnProjectContactsYesInit = reindex_array_keys(Alloy.Globals.nnProjectContactsYesInit, 0);
				}
			}
		}

		if (contactExists === true) {
			//alert('Contact:' + fullName + ' already already said yes for project: ' + projectName + '.');
			return false;
		} else {

			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			keyValuePairObj['contactUUID'] = contactUUID;
			keyValuePairObj['fullName'] = fullName;
			keyValuePairObj['contactJSON'] = contactJSON;
			keyValuePairObj['preferredEmail'] = '';
			keyValuePairObj['preferredPhone'] = '';

			Alloy.Globals.nnProjectContactsYesInit.push(keyValuePairObj);

		}

	},
	//Used to add NO contacts to the project collection
	addNoProjectContactsOnInit : function _addNoProjectContactsOnInit(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContactsNoInit.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsNoInit.length; i++) {
				if ((Alloy.Globals.nnProjectContactsNoInit[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsNoInit[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsNoInit[i].contactUUID === contactUUID)) {
					contactExists = true;
					//delete Alloy.Globals.nnProjectContactsNoInit[i];
					//Alloy.Globals.nnProjectContactsNoInit = reindex_array_keys(Alloy.Globals.nnProjectContactsNoInit, 0);
				}
			}
		}

		if (contactExists === true) {
			alert('Contact:' + fullName + ' already already said no for project: ' + projectName + '.');
			return false;
		} else {

			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			keyValuePairObj['contactUUID'] = contactUUID;
			keyValuePairObj['fullName'] = fullName;
			keyValuePairObj['contactJSON'] = contactJSON;
			keyValuePairObj['preferredEmail'] = '';
			keyValuePairObj['preferredPhone'] = '';
			Alloy.Globals.nnProjectContactsNoInit.push(keyValuePairObj);

		}

	},

	// adds the calculated number of contacts perday to a separate collection
	addProjectContactsNumberPerDayOnInit : function _addProjectContactsNumberPerDayOnInit(projectName, numberOfDailyContacts) {
		var contactExists = false;
		try {
			if (Alloy.Globals.nnProjectContactNumberPerDayInit.length > 0) {
				for (var i = 0; i < Alloy.Globals.nnProjectContactNumberPerDayInit.length; i++) {
					if (Alloy.Globals.nnProjectContactNumberPerDayInit[i] != undefined) {
						if (Alloy.Globals.nnProjectContactNumberPerDayInit[i].projectName === projectName) {// && (Alloy.Globals.nnProjectContactNumberPerDay[i].numberOfDailyContacts === numberOfDailyContacts)) {
							//delete Alloy.Globals.nnProjectContactNumberPerDayInit[i];
							//Alloy.Globals.nnProjectContactsPerDayInit = reindex_array_keys(Alloy.Globals.nnProjectContactsPerDayInit, 0);
							contactExists = true;
						}
					}
				}
			}
		} catch(err) {

		}

		if (contactExists === true){
			return false;
		}
		var keyValuePairObj = {};
		keyValuePairObj['projectName'] = projectName;
		keyValuePairObj['numberOfDailyContacts'] = numberOfDailyContacts;
		Alloy.Globals.nnProjectContactNumberPerDayInit.push(keyValuePairObj);

	},

	// adds the calculated number of needed to acheive goal
	addContactsNumberForGoalOnInit : function _addContactsNumberForGoalOnInit(projectName, contactsNumberForGoal) {
		try {
			if (Alloy.Globals.nnContactsNumberForGoalInit.length > 0) {
				for (var i = 0; i < Alloy.Globals.nnContactsNumberForGoalInit.length; i++) {
					if (Alloy.Globals.nnContactsNumberForGoalInit[i].projectName === projectName) {
						delete Alloy.Globals.nnContactsNumberForGoalInit[i];
					}
				}
			}
		} catch(err) {

		}

		var keyValuePairObj = {};
		keyValuePairObj['projectName'] = projectName;
		keyValuePairObj['contactsNumberForGoal'] = contactsNumberForGoal;
		Alloy.Globals.nnContactsNumberForGoalInit.push(keyValuePairObj);

	},

	//This is the actual number of contacts per day the user needs to contact. Where category = UNK
	addProjectContactsPerDayOnInit : function _addProjectContactsPerDayOnInit(projectName) {

		var numberOfContacts = 0;

		if (Alloy.Globals.nnProjectContactNumberPerDayInit.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactNumberPerDayInit.length; i++) {
				if (Alloy.Globals.nnProjectContactNumberPerDayInit[i] != undefined) {
					if ((Alloy.Globals.nnProjectContactNumberPerDayInit[i].projectName === projectName)) {
						numberOfContacts = Alloy.Globals.nnProjectContactNumberPerDayInit[i].numberOfDailyContacts;
					}
				}
			}
		}

		if (numberOfContacts > 0) {
			for (var i = 0; i < numberOfContacts; i++) {
				if (i < Alloy.Globals.nnProjectContactsInit.length) {
					if ((Alloy.Globals.nnProjectContactsInit[i].projectName === projectName)) {

						var p = require('projectWatingToHearOnLoad');
						p.addWaitingToHearOnInit(projectName, Alloy.Globals.nnProjectContactsInit[i].fullName, 'contactUUID', Alloy.Globals.nnProjectContactsInit[i].contactJSON);
						p = null;
					}
				}
			}

		}

	}
};
module.exports = projectManagerInitOnLoad;

function reindex_array_keys(array, start) {
	var temp = [];
	start = typeof start == 'undefined' ? 0 : start;
	start = typeof start != 'number' ? 0 : start;
	for (var i in array) {
		temp[start++] = array[i];
	}
	return temp;
}

