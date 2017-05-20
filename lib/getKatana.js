/**
 * @author William Westgroves
 * Utility class for managing data to and from the Katana server.
 */
var getKatana = {

	/**
	 * Get JSON from Katana
	 */

	callKatana : function _callKatana() {

		var xhr = Titanium.Network.createHTTPClient();
		xhr.setTimeout(5000);
		var url = Alloy.Globals.KatanaPathURL + "contacts/v1.0/get";
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader('charset', 'utf-8');

		xhr.onload = function() {
			var status;
			var data;

			if (xhr.readyState == 4) {// `DONE`
				status = xhr.status;
				if (status == 200) {

					//Ti.API.info('xhr.responseText:' + xhr.responseText);
					Ti.App.fireEvent("app.loadJSON", {
						"responseText" : xhr.responseText
					});
				} else {
					//errorHandler && errorHandler(status);

					var freindlyError = '{"users": [{"favorite": false,"latitude": 0,"longitude": 0,"photo": "","bubbleParent": true,"email": {},"lastName": "SERVER ERROR"}]}';
					Ti.App.fireEvent("app.errorGettingJSON", {
						"responseText" : freindlyError
					});
				}
				
			}
			timeout : 15000; // in milliseconds
		};
		var sendString = '{\"UUID\" : \"' + Alloy.Globals.NetworkNinjaUUID + '\"}';
		Ti.API.info('xhr.sendString:' + sendString);
		xhr.send(sendString);
		if (Alloy.Globals.katanaContacted = true) {
			return true;
		} else {
			return false;
		};

	}
	/**
	 * End Get JSON from Katana
	 */

};

Ti.App.addEventListener("app.loadJSON", function(data) {
	Alloy.Globals.katanaContacted = true;
	Ti.API.info('Event listner fired katanaContacted set to : ' + Alloy.Globals.katanaContacted);
	Alloy.Globals.katanaContacts = "";
	Alloy.Globals.katanaAPIServiceRunning = true;
	Alloy.Globals.katanaContacts = data.responseText;
	var wld = require('logLocalData');
	wld.logLocalData(data.responseText, 'localContacts');
	Ti.API.info('Event listner fired: ');

});

Ti.App.addEventListener("app.errorGettingJSON", function(data) {
	Alloy.Globals.katanaContacted = false;
	Ti.API.info('Event listner fired katanaContacted Error set to : ' + Alloy.Globals.katanaContacted);
	Alloy.Globals.katanaContacts = "";
	Alloy.Globals.katanaAPIServiceRunning = false;
	Alloy.Globals.katanaContacts = data.responseText;
	Ti.API.info('Event listner fired: ' + Alloy.Globals.katanaContacts);

});

module.exports = getKatana;

