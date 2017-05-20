/**
 * ProjectManager
 * Utility class for managing application Projects, goals and tasks
 */
var projectManager = {

	/**
	 * Reference to the local storage array that persists between sessions
	 */
	projects : Ti.App.Properties.getList("projects", []),

	/**
	 * Determines if the passed in ID of the contact currently exists in the bookmarks array.
	 * Returns TRUE if successful.
	 *
	 * @param {String} id - the ID of the contact that is used to search the bookmarks array
	 */
	exists : function _exists(id) {

		/**
		 * Return the result of the search for the user id in the bookmarks
		 * array. (Uses the UnderscoreJS _.find() function )
		 */
		return _.find(this.projects, function(item) {
			return id === item;
		});
	},

	/**
	 * Checks to see if the item id already exists as a project, and if not adds it to the project
	 * array and persists it into local storage
	 *
	 * @param {String} id - the ID of the project to add to your projects list
	 */
	add : function _push(id) {

		if (!this.exists(id)) {
			/**
			 * Then add this project to the projects array, and update the button title for projects
			 */
			this.projects.push(id);
		}

		/**
		 * Update the bookmarks array in Ti.App.Properties
		 */
		Ti.App.Properties.setList("projects", this.projects);
	},

	addProject : function _addProject(projectName) {
		//Avoid entering duplicate project names
		var projectExists = false;
		if (Alloy.Globals.nnProject.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProject.length; i++) {
				if (Alloy.Globals.nnProject[i].projectName === projectName) {
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
			Alloy.Globals.nnProject.push(keyValuePairObj);
			storeProjectData('nnProject', Alloy.Globals.nnProject);

			return true;
		}

	},

	addGoals : function _addGoals(projectName, goalName, goalDesc, startDate, endDate, numberOfContacts) {
		//Avoid duplicates
		var goalExists = false;
		if (Alloy.Globals.nnProject.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnGoals.length; i++) {
				if ((Alloy.Globals.nnGoals[i].projectName === projectName) && (Alloy.Globals.nnGoals[i].goalName === goalName)) {
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
			Alloy.Globals.nnGoals.push(keyValuePairObj);
			storeProjectData('nnGoals', Alloy.Globals.nnGoals);
			return true;

		}

	},

	updateGoals : function _updateGoals(projectName, goalName, goalDesc, startDate, endDate, numberOfContacts) {
		//Find, remove and re-add.
		var goalExists = false;
		if (Alloy.Globals.nnProject.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnGoals.length; i++) {
				if ((Alloy.Globals.nnGoals[i].projectName === projectName) && (Alloy.Globals.nnGoals[i].goalName === goalName)) {
					delete Alloy.Globals.nnGoals[i];
					Alloy.Globals.nnGoals = reindex_array_keys(Alloy.Globals.nnGoals, 0);
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
		Alloy.Globals.nnGoals.push(keyValuePairObj);
		storeProjectData('nnGoals', Alloy.Globals.nnGoals);
		return true;

	},

	addTasks : function _addTasks(projectName, goalName, taskName, taskDescription, startDate, endDate) {
		//Avoid duplicates
		var taskExists = false;
		if (Alloy.Globals.nnTasks.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnTasks.length; i++) {
				if ((Alloy.Globals.nnTasks[i].projectName === projectName) && (Alloy.Globals.nnTasks[i].goalName === goalName) && (Alloy.Globals.nnTasks[i].taskName === taskName)) {
					taskExists = true;
				}
			}
		}

		if (taskExists === true) {
			alert('Task:' + taskName + ' already exists for goal: ' + goalName + ' in project: ' + projectName + '.');
			return false;
		} else {

			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			keyValuePairObj['goalName'] = goalName;

			keyValuePairObj['taskName'] = taskName;
			keyValuePairObj['taskDescription'] = taskDescription;

			keyValuePairObj['startDate'] = startDate;
			keyValuePairObj['endDate'] = endDate;
			Alloy.Globals.nnTasks.push(keyValuePairObj);
			return true;

		}

	},
	//Used to add contacts to the project collection
	addProjectContacts : function _addProjectContacts(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContacts.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContacts.length; i++) {
				if ((Alloy.Globals.nnProjectContacts[i].projectName === projectName) && (Alloy.Globals.nnProjectContacts[i].fullName === fullName) && (Alloy.Globals.nnProjectContacts[i].contactUUID === contactUUID)) {
					contactExists = true;
					//delete Alloy.Globals.nnProjectContacts[i];
					//Alloy.Globals.nnProjectContacts = reindex_array_keys(Alloy.Globals.nnProjectContacts, 0);
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
			keyValuePairObj['contactJSON'] = contactJSON;
			keyValuePairObj['preferredEmail'] = '';
			keyValuePairObj['preferredPhone'] = '';

			Alloy.Globals.nnProjectContacts.push(keyValuePairObj);
			storeComplexProjectContactData('nnProjectContacts', Alloy.Globals.nnProjectContacts);
		}

	},

	//Used to add YES contacts to the project collection
	addYesProjectContacts : function _addYesProjectContacts(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContactsYes.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsYes.length; i++) {
				if ((Alloy.Globals.nnProjectContactsYes[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsYes[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsYes[i].contactUUID === contactUUID)) {
					contactExists = true;
					//delete Alloy.Globals.nnProjectContactsYes[i];
					//Alloy.Globals.nnProjectContactsYes = reindex_array_keys(Alloy.Globals.nnProjectContactsYes, 0);
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

			Alloy.Globals.nnProjectContactsYes.push(keyValuePairObj);
			storeComplexProjectContactData('nnProjectContactsYes', Alloy.Globals.nnProjectContactsYes);
		}

	},
	//Used to add NO contacts to the project collection
	addNoProjectContacts : function _addNoProjectContacts(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContactsNo.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsNo.length; i++) {
				if ((Alloy.Globals.nnProjectContactsNo[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsNo[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsNo[i].contactUUID === contactUUID)) {
					contactExists = true;
					//delete Alloy.Globals.nnProjectContactsNo[i];
					//Alloy.Globals.nnProjectContactsYes = reindex_array_keys(Alloy.Globals.nnProjectContactsNo, 0);
				}
			}
		}

		if (contactExists === true) {
			//alert('Contact:' + fullName + ' already already said no for project: ' + projectName + '.');
			return false;
		} else {

			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			keyValuePairObj['contactUUID'] = contactUUID;
			keyValuePairObj['fullName'] = fullName;
			keyValuePairObj['contactJSON'] = contactJSON;
			keyValuePairObj['preferredEmail'] = '';
			keyValuePairObj['preferredPhone'] = '';
			Alloy.Globals.nnProjectContactsNo.push(keyValuePairObj);
			storeComplexProjectContactData('nnProjectContactsNo', Alloy.Globals.nnProjectContactsNo);
		}

	},

	// adds the calculated number of contacts perday to a separate collection
	addProjectContactsNumberPerDay : function _addProjectContactsNumberPerDay(projectName, numberOfDailyContacts) {
		var ifExists = false;
		try {
			if (Alloy.Globals.nnProjectContactsPerDay.length > 0) {
				for (var i = 0; i < Alloy.Globals.nnProjectContactNumberPerDay.length; i++) {
					if (Alloy.Globals.nnProjectContactNumberPerDay[i] != undefined) {
						if (Alloy.Globals.nnProjectContactNumberPerDay[i].projectName === projectName) {// && (Alloy.Globals.nnProjectContactNumberPerDay[i].numberOfDailyContacts === numberOfDailyContacts)) {
							//delete Alloy.Globals.nnProjectContactNumberPerDay[i];
							//Alloy.Globals.nnProjectContactNumberPerDay = reindex_array_keys(Alloy.Globals.nnProjectContactNumberPerDay, 0);
							ifExists = true;
						}
					}
				}
			}
		} catch(err) {

		}

		if (ifExists === true) {
			return false;
		}
		var keyValuePairObj = {};
		keyValuePairObj['projectName'] = projectName;
		keyValuePairObj['numberOfDailyContacts'] = numberOfDailyContacts;
		Alloy.Globals.nnProjectContactNumberPerDay.push(keyValuePairObj);
		storeProjectData('nnProjectContactNumberPerDay', Alloy.Globals.nnProjectContactNumberPerDay);

	},

	// adds the calculated number of needed to acheive goal
	addContactsNumberForGoal : function _addContactsNumberForGoal(projectName, contactsNumberForGoal) {
		try {
			if (Alloy.Globals.nnContactsNumberForGoal.length > 0) {
				for (var i = 0; i < Alloy.Globals.nnContactsNumberForGoal.length; i++) {
					if (Alloy.Globals.nnContactsNumberForGoal[i].projectName === projectName) {
						delete Alloy.Globals.nnContactsNumberForGoal[i];
					}
				}
			}
		} catch(err) {

		}

		var keyValuePairObj = {};
		keyValuePairObj['projectName'] = projectName;
		keyValuePairObj['contactsNumberForGoal'] = contactsNumberForGoal;
		Alloy.Globals.nnContactsNumberForGoal.push(keyValuePairObj);
		storeProjectData('nnContactsNumberForGoal', Alloy.Globals.nnContactsNumberForGoal);

	},

	//This is the actual number of contacts per day the user needs to contact. Where category = UNK
	addProjectContactsPerDay : function _addProjectContactsPerDay(projectName, numberOfDailyContacts) {
		var startingIndex = 0;
		var numberOfContacts = numberOfDailyContacts;
		/* //Ti.API.info('Project Manger nnProjectContactNumberPerDay.length: ' + Alloy.Globals.nnProjectContactNumberPerDay.length);
		startingIndex = getStartingIndexForProjectContactNumberPerDay(projectName);
		//Ti.API.info('Project Manger nnProjectContactNumberPerDay startingIndex: ' + startingIndex);
		if (Alloy.Globals.nnProjectContactNumberPerDay.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactNumberPerDay.length; i++) {
				if (Alloy.Globals.nnProjectContactNumberPerDay[i] != undefined) {
					if ((Alloy.Globals.nnProjectContactNumberPerDay[i].projectName === projectName)) {
						numberOfContacts = Alloy.Globals.nnProjectContactNumberPerDay[i].numberOfDailyContacts;
						break;
					}
				}
			}
		} */
		//Ti.API.info('Project Manger number of contacts: ' + numberOfContacts);
		//Need to find start index where project exists in the collection
		//Iterate from there to get contacts; otherwise it will loop throught the first 7 (example) and never get to the subsequent projects
		startingIndex = 0;
		startingIndex = getStartingIndexForProjectContacts(projectName);
		//Ti.API.info('Project Manger numberOfContacts startingIndex: ' + startingIndex);
		intDailyContactCounter = 0;
		if (numberOfContacts > 0) {
			for (var i = startingIndex; i < Alloy.Globals.nnProjectContacts.length; i++) {
				if (intDailyContactCounter <= numberOfContacts) {
					//Ti.API.info('Project Manger intDailyContactCounter <= numberOfContacts : ' + intDailyContactCounter + '|' + numberOfContacts);
					if ((Alloy.Globals.nnProjectContacts[i].projectName === projectName)) {
						//Ti.API.info('Project Manger calling projectWatingToHear');
						var p = require('projectWatingToHear');
						p.addWaitingToHear(projectName, Alloy.Globals.nnProjectContacts[i].fullName, 'contactUUID', Alloy.Globals.nnProjectContacts[i].contactJSON);
						p = null;
						intDailyContactCounter = intDailyContactCounter + 1;
					}
				} else {
					break;
				}
			}

		}

	},

	removeProjectContacts : function _removeProjectContacts(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContacts.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContacts.length; i++) {
				if ((Alloy.Globals.nnProjectContacts[i].projectName === projectName) && (Alloy.Globals.nnProjectContacts[i].fullName === fullName) && (Alloy.Globals.nnProjectContacts[i].contactUUID === contactUUID)) {
					var argsIN = Alloy.Globals.nnProjectContacts[i] || {};
					var argName = [];
					argName = argsIN;
					if (argName.hasOwnProperty('fullName')) {
						delete Alloy.Globals.nnProjectContacts[i];
						Alloy.Globals.nnProjectContacts = reindex_array_keys(Alloy.Globals.nnProjectContacts, 0);
						storeComplexProjectContactData('nnProjectContacts', Alloy.Globals.nnProjectContacts);
					}
				}
			}
		}

	},

	removeNoProjectContacts : function _removeNoProjectContacts(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContactsNo.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsNo.length; i++) {
				if ((Alloy.Globals.nnProjectContactsNo[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsNo[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsNo[i].contactUUID === contactUUID)) {
					var argsIN = Alloy.Globals.nnProjectContactsNo[i] || {};
					var argName = [];
					argName = argsIN;
					if (argName.hasOwnProperty('fullName')) {
						delete Alloy.Globals.nnProjectContactsNo[i];
						Alloy.Globals.nnProjectContactsNo = reindex_array_keys(Alloy.Globals.nnProjectContactsNo, 0);
						storeComplexProjectContactData('nnProjectContactsNo', Alloy.Globals.nnProjectContactsNo);
					}
				}
			}
		}

	},

	removeYesProjectContacts : function _removeYesProjectContacts(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContactsYes.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsYes.length; i++) {
				if ((Alloy.Globals.nnProjectContactsYes[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsYes[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsYes[i].contactUUID === contactUUID)) {
					var argsIN = Alloy.Globals.nnProjectContactsYes[i] || {};
					var argName = [];
					argName = argsIN;
					if (argName.hasOwnProperty('fullName')) {
						delete Alloy.Globals.nnProjectContactsYes[i];
						Alloy.Globals.nnProjectContactsYes = reindex_array_keys(Alloy.Globals.nnProjectContactsYes, 0);
						storeComplexProjectContactData('nnProjectContactsYes', Alloy.Globals.nnProjectContactsYes);
					}
				}
			}
		}

	},
	removeWaitingProjectContacts : function _removeWaitingProjectContacts(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;
		if (Alloy.Globals.nnProjectContactsPerDay.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsPerDay.length; i++) {
				if ((Alloy.Globals.nnProjectContactsPerDay[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsPerDay[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsPerDay[i].contactUUID === contactUUID)) {
					var argsIN = Alloy.Globals.nnProjectContactsPerDay[i] || {};
					var argName = [];
					argName = argsIN;
					if (argName.hasOwnProperty('fullName')) {
						delete Alloy.Globals.nnProjectContactsPerDay[i];
						Alloy.Globals.nnProjectContactsPerDay = reindex_array_keys(Alloy.Globals.nnProjectContactsPerDay, 0);
						storeComplexProjectContactData('nnProjectContactsPerDay', Alloy.Globals.nnProjectContactsPerDay);
					}

				}
			}
		}

	},

	updateProjectContactPreferences : function _updateProjectContactPreferences(projectName, fullName, contactUUID, contactJSON, preferredEmail, preferredPhone) {

		if (Alloy.Globals.nnProjectContacts.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContacts.length; i++) {
				if ((Alloy.Globals.nnProjectContacts[i].projectName === projectName) && (Alloy.Globals.nnProjectContacts[i].fullName === fullName) && (Alloy.Globals.nnProjectContacts[i].contactUUID === contactUUID)) {
					delete Alloy.Globals.nnProjectContacts[i];
					Alloy.Globals.nnProjectContacts = reindex_array_keys(Alloy.Globals.nnProjectContacts, 0);
				}
			}
		}

		var keyValuePairObj = {};
		keyValuePairObj['projectName'] = projectName;
		keyValuePairObj['contactUUID'] = contactUUID;
		keyValuePairObj['fullName'] = fullName;
		keyValuePairObj['contactJSON'] = contactJSON;
		keyValuePairObj['preferredEmail'] = '';
		keyValuePairObj['preferredPhone'] = '';
		Alloy.Globals.nnProjectContacts.push(keyValuePairObj);
		storeComplexProjectContactData('nnProjectContacts', Alloy.Globals.nnProjectContacts);

	},

	/**
	 * Removes the passed in project id from the projects list
	 *
	 * @param {String} id - the ID of the project to remove from your projects list
	 */
	remove : function _remove(id) {

		/**
		 * Else remove the projects from the projects array (usess Underscore js difference function),
		 * and update the button title accordingly
		 */
		this.projects = _.difference(this.projects, [id]);

		/**
		 * Update the projects array in Ti.App.Properties
		 */
		Ti.App.Properties.setList("projects", this.projects);
	},
	/**
	 * Used to remove all project data
	 */
	wipeAllProjects : function _wipeAllProjects() {
		deleteEverything();
	}
};
module.exports = projectManager;

function reindex_array_keys(array, start) {
	var temp = [];
	start = typeof start == 'undefined' ? 0 : start;
	start = typeof start != 'number' ? 0 : start;
	for (var i in array) {
		temp[start++] = array[i];
	}
	return temp;
}

function storeComplexProjectContactData(module, dataIn) {
	var data = [];

	if (dataIn.length > 0) {
		for (var i = 0; i < dataIn.length; i++) {

			data.push({
				projectName : dataIn[i].projectName,
				contactUUID : dataIn[i].contactUUID,
				fullName : dataIn[i].fullName,
				//contactJSON : JSON.stringify('[' + JSON.stringify(dataIn[i].contactJSON) + ']'),
				contactJSON : dataIn[i].contactJSON,
				preferredEmail : '',
				preferredPhone : ''

			});

		}
		var stringJSON = JSON.stringify(data);
		////Ti.API.info(module + ' collection Data: ' + stringJSON);
		var spd = require('logLocalData');
		//Ti.API.info(stringJSON);
		spd.logLocalData(stringJSON, module);
		spd = null;
	}

}

function storeProjectData(module, data) {

	var stringJSON = JSON.stringify(data);

	//Remove old data
	//var rmd = require('removeLocalData');
	//rmd.removeLocalData(module);
	//rmd = null;
	//Save locally
	var spd = require('logLocalData');
	//Ti.API.info(stringJSON);
	spd.logLocalData(stringJSON, module);
	spd = null;

}

/**
 * Used to remove project, project contacts, project contacts per day, project contact yes and no
 *
 * @param {String} module - the name of the project to remove from your projects list
 */
function deleteProject(module) {

}

/**
 * Used to remove all project data
 */
function deleteEverything() {
	//Remove old data
	var rmd = require('removeLocalProjectData');
	rmd.removeLocalProjectData('nnProject');
	rmd.removeLocalProjectData('nnGoals');
	rmd.removeLocalProjectData('nnProjectContacts');
	rmd.removeLocalProjectData('nnProjectContactsPerDay');
	rmd.removeLocalProjectData('nnContactsNumberForGoal');
	rmd.removeLocalProjectData('nnProjectContactsYes');
	rmd.removeLocalProjectData('nnProjectContactsNo');
	rmd = null;
}

function getStartingIndexForProjectContacts(projectName) {
	intStartingIndex = 0;
	for (var i = 0; i < Alloy.Globals.nnProjectContacts.length; i++) {
		if ((Alloy.Globals.nnProjectContacts[i].projectName === projectName)) {
			intStartingIndex = i;
			break;
		}
	}
	return intStartingIndex;

}

function getStartingIndexForProjectContactNumberPerDay(projectName) {
	//Alloy.Globals.nnProjectContactNumberPerDay.length
	intStartingIndex = 0;
	for (var i = 0; i < Alloy.Globals.nnProjectContactNumberPerDay.length; i++) {
		if ((Alloy.Globals.nnProjectContactNumberPerDay[i].projectName === projectName)) {
			intStartingIndex = i;
			break;
		}
	}
	return intStartingIndex;
}

