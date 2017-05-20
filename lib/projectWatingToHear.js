/**
 * projectWatingToHear
 * Utility class for managing application Projects,projectWatingToHear in PD.js
 */
var projectWatingToHear = {

	// Used to add contacts to the projects daily contact list in PD.JS 'Waiting to hear from you'
	addWaitingToHear : function _addWaitingToHear(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;

		if (Alloy.Globals.nnProjectContactsPerDay.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsPerDay.length; i++) {
				//if (Alloy.Globals.nnProjectContactsPerDay[i] != undefined) {

					//Ti.API.info('Waiting to hear PROJECT NAME: ' + Alloy.Globals.nnProjectContactsPerDay[i].projectName);
					//Ti.API.info('Waiting to hear fullName: ' + Alloy.Globals.nnProjectContactsPerDay[i].fullName);
					//Ti.API.info('Waiting to hear contactUUID: ' + Alloy.Globals.nnProjectContactsPerDay[i].contactUUID);
					////Ti.API.info('Waiting to hear contactJSON: ' + Alloy.Globals.nnProjectContactsPerDay[i].contactJSON);

					if ((Alloy.Globals.nnProjectContactsPerDay[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsPerDay[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsPerDay[i].contactUUID === contactUUID)) {
						contactExists = true;
						//delete Alloy.Globals.nnProjectContactsPerDay[i];
						//Alloy.Globals.nnProjectContactsPerDay = reindex_array_keys(Alloy.Globals.nnProjectContactsPerDay, 0);
					}
				//}
			}
		}

		if (contactExists === true) {
			return false;
		} else {

			////Ti.API.info('Waiting to hear projectName: ' + projectName);
			//Ti.API.info('Waiting to hear fullName: ' + fullName);
			//Ti.API.info('Waiting to hear contactUUID: ' + contactUUID);
			//Ti.API.info('Waiting to hear contactJSON: ' + contactJSON);

			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			keyValuePairObj['contactUUID'] = contactUUID;
			keyValuePairObj['fullName'] = fullName;
			keyValuePairObj['contactJSON'] = contactJSON;
			keyValuePairObj['preferredEmail'] = '';
			keyValuePairObj['preferredPhone'] = '';
			Alloy.Globals.nnProjectContactsPerDay.push(keyValuePairObj);
			storeComplexProjectContactData('nnProjectContactsPerDay', Alloy.Globals.nnProjectContactsPerDay);

		}

	},
};
module.exports = projectWatingToHear;

function storeProjectData(module, data) {
	//Remove old data
	var rmd = require('removeLocalData');
	rmd.removeLocalData(module);
	rmd = null;
	//Save locally
	var spd = require('logLocalData');
	spd.logLocalData(data, module);
	spd = null;

}

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
				contactJSON : JSON.stringify('[' + JSON.stringify(dataIn[i].contactJSON) + ']'),
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