/**
 * projectWatingToHear
 * Utility class for managing application Projects,projectWatingToHear in PD.js
 */
var projectWatingToHearOnLoad = {

	// Used to add contacts to the projects daily contact list in PD.JS 'Waiting to hear from you'
	addWaitingToHearOnInit : function _addWaitingToHearOnInit(projectName, fullName, contactUUID, contactJSON) {

		var contactExists = false;

		if (Alloy.Globals.nnProjectContactsPerDayInit.length > 0) {
			for (var i = 0; i < Alloy.Globals.nnProjectContactsPerDayInit.length; i++) {
				//if (Alloy.Globals.nnProjectContactsPerDayInit[i] != undefined) {

					if ((Alloy.Globals.nnProjectContactsPerDayInit[i].projectName === projectName) && (Alloy.Globals.nnProjectContactsPerDayInit[i].fullName === fullName) && (Alloy.Globals.nnProjectContactsPerDayInit[i].contactUUID === contactUUID)) {
						contactExists = true;
						//delete Alloy.Globals.nnProjectContactsPerDayInit[i];
						//Alloy.Globals.nnProjectContactsPerDayInit = reindex_array_keys(Alloy.Globals.nnProjectContactsPerDayInit, 0);
					}
				//}
			}
		}

		if (contactExists === true) {
			return false;
		} else {

			var keyValuePairObj = {};
			keyValuePairObj['projectName'] = projectName;
			keyValuePairObj['contactUUID'] = contactUUID;
			keyValuePairObj['fullName'] = fullName;
			keyValuePairObj['contactJSON'] = contactJSON;
			keyValuePairObj['preferredEmail'] = '';
			keyValuePairObj['preferredPhone'] = '';
			Alloy.Globals.nnProjectContactsPerDayInit.push(keyValuePairObj);
			//Alloy.Globals.nnProjectContactsPerDayInit = reindex_array_keys(Alloy.Globals.nnProjectContactsPerDayInit, 0);
			
		}

	},
};
module.exports = projectWatingToHearOnLoad;



function reindex_array_keys(array, start) {
	var temp = [];
	start = typeof start == 'undefined' ? 0 : start;
	start = typeof start != 'number' ? 0 : start;
	for (var i in array) {
		temp[start++] = array[i];
	}
	return temp;
}

