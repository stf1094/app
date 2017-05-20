/**
 * @author William Westgroves
 */
var localContacts = {
	getContacts : function _getContacts() {
		if (Alloy.Globals.DebugOn === true) {
			var email = require('email');
			email.emailContacts('Retrieve contacts: Line 8');
		}

		Ti.API.info('---------Retrieve Contacts from device-----------');
		var rmd = require('removeLocalData');
		rmd.removeLocalData('localContacts');
		var localVal = parseJSON();

		if (localVal.substr(1, 4) === '{},{') {
			return deepJSONParse();//.replace(/\\/g,"\\\\");
		} else {
			return localVal;//.replace(/\\/g,"\\\\");
		}

	}
};

function deepJSONParse() {
	Ti.API.info('---------Retrieve Contacts from iPhone-----------');
	var rawSingleData = '';
	var rawMultiData = '';
	var rawPersonChunk = '';
	//var singleValue = ['recordId', 'firstName', 'middleName', 'lastName', 'fullName', 'prefix', 'suffix', 'nickname', 'firstPhonetic', 'middlePhonetic', 'lastPhonetic', 'organization', 'jobTitle', 'department', 'note', 'birthday', 'created', 'modified', 'kind'];
	var singleValue = ['recordId', 'firstName', 'middleName', 'lastName', 'fullName', 'prefix', 'suffix', 'nickname', 'firstPhonetic', 'middlePhonetic', 'lastPhonetic', 'organization', 'jobTitle', 'department', 'birthday', 'created', 'modified', 'kind'];
	var multiValue = ['email', 'address', 'phone', 'relatedNames'];
	//,'instantMessage', 'date', 'url'
	var people = Ti.Contacts.getAllPeople();
	//Ti.API.info('Total contacts: ' + people.length);
	for (var i = 0,
	    ilen = people.length; i < ilen; i++) {
		Ti.API.info('---------------------');
		var person = people[i];
		for (var j = 0,
		    jlen = singleValue.length; j < jlen; j++) {
			if (rawSingleData.length === 0) {
				rawSingleData = rawSingleData + '"' + singleValue[j] + '": "' + person[singleValue[j]] + '"';
			} else {
				rawSingleData = rawSingleData + ',"' + singleValue[j] + '": "' + person[singleValue[j]] + '"';
			}
			rawSingleData = rawSingleData.replace(/[\xE2\x80\x9C]/g, /[\x22]/g);
			rawSingleData = rawSingleData.replace(/[\xE2]/g, /[\x22]/g);
			rawSingleData = rawSingleData.replace(/\r?\n|\r/, '');

		}
		for (var j = 0,
		    jlen = multiValue.length; j < jlen; j++) {

			if (rawMultiData.length === 0) {
				Ti.API.info('rawMultiData = ' + rawMultiData);
				Ti.API.info('rawMultiData = ' + JSON.stringify(person[multiValue[j]]));
				rawMultiData = rawMultiData + '"' + multiValue[j] + '": ' + JSON.stringify(person[multiValue[j]]);

			} else {
				Ti.API.info('rawMultiData = ' + rawMultiData);
				Ti.API.info('rawMultiData = ' + JSON.stringify(person[multiValue[j]]));
				rawMultiData = rawMultiData + ',"' + multiValue[j] + '": ' + JSON.stringify(person[multiValue[j]]);

			}
		}

		if (rawPersonChunk.length === 0) {
			rawPersonChunk = rawPersonChunk + '{' + rawSingleData + ',' + rawMultiData + '}';
		} else {
			rawPersonChunk = rawPersonChunk + ',{' + rawSingleData + ',' + rawMultiData + '}';
		}
		Ti.API.info("rawPersonChunk: " + rawPersonChunk);
		rawSingleData = '';
		rawMultiData = '';
	}
	var returnIPhoneJSON = '[' + rawPersonChunk + ']';
	returnIPhoneJSON.replace(/[\xE2\x80\x9C]/g, /[\x22]/g);
	returnIPhoneJSON.replace(/[\xE2]/g, /[\x22]/g);
	returnIPhoneJSON.replace(/\'/g, "");
	returnIPhoneJSON.replace(/'/g, '`');
	returnIPhoneJSON.replace('"', '');
	returnIPhoneJSON.replace(/\r?\n|\r/, '');
	Ti.API.info("iPhone Contacts: " + returnIPhoneJSON);
	if (Alloy.Globals.DebugOn === true) {
	  var email = require('email');
	  email.emailContacts(returnIPhoneJSON);
	}
	return returnIPhoneJSON;
}

function parseJSON() {
	var obj = Ti.Contacts.getAllPeople();
	var jsonString = JSON.stringify(obj);
	//Ti.API.info("Local Contacts: " + jsonString);
	jsonString.replace(/[\xE2\x80\x9C]/g, /[\x22]/g);
	jsonString.replace(/[\xE2]/g, /[\x22]/g);
	if (Alloy.Globals.DebugOn === true) {
		var email = require('email');
		email.emailContacts(jsonString);
	}
	return jsonString;
}

function isiOS7Plus() {
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS') {
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0], 10);

		// Can only test this support on a 3.2+ device
		if (major >= 7) {
			//alert('isiOS7Plus');
			return true;
		}
	}
	return false;
}

module.exports = localContacts;
