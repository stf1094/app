/**
 * @author William Westgroves
 * Utility class for managing data to and from the Katana server.
 */
var managePermissions = {
	getPermissionForContacts : function _getPermissionForContacts() {

		var strSource = "AO";

		if (Alloy.Globals.osname === 'ipad') {
			strSource = "IP";
		}
		if (Alloy.Globals.osname === 'android') {
			strSource = "DR";
		}

		var performAddressBookFunction = function() {
			var localContacts = require('localContacts');
			var kat = require('postKatana');
			kat.postToKatana(localContacts.getContacts(), strSource);

		};
		var addressBookDisallowed = function() {
			var kat = require('katana');
			kat.postToKatana("[{\"PermissionError\":\"Could not connect:" + "addressbookdisallowed" + "\"}]", strSource);
		};
		if (Ti.Contacts.hasContactsPermissions()) {
			performAddressBookFunction();
		} else {
			Ti.Contacts.requestContactsPermissions(function(e) {
				if (e.success) {
					performAddressBookFunction();
					if (OS_IOS) {
						//Let put FB in here...
						var kat = require('getFacebook');
						kat.callFaceBook();
						kat = null;
						//var mmm = require('email');
						//mmm.emailContacts(Alloy.Globals.faceBookContacts);
						//mmm = null;
					}
				} else {
					addressBookDisallowed();
				}
			});
		}
		//Need permissioin to native calendar.
		if (Ti.Calendar.hasCalendarPermissions()) {
			//performCalendarReadFunctions();
		} else {
			Ti.Calendar.requestCalendarPermissions(function(e) {
				if (e.success) {
					//performCalendarReadFunctions();
				} else {
					Ti.API.error(e.error);
					alert('Access to calendar is not allowed');
				}
			});
		}

	}
};

module.exports = managePermissions;
