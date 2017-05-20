/**
 * Get JSON from Katana
 */
this.callKatana = function () {
	

	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(5000);
	var url = Alloy.Globals.KatanaPathURL + 'contacts/v1.0/get';
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader('charset', 'utf-8');

	xhr.onload = function() {
		var status;
		var data;

		if (xhr.readyState == 4) {// `DONE`
			status = xhr.status;
			if (status == 200) {
				Ti.API.info('xhr.responseText:' + xhr.responseText);
				Ti.App.fireEvent("app.loadJSON", {
					"responseText" : xhr.responseText
				});
			} else {
				errorHandler && errorHandler(status);
			}
		}
	};
	var sendString = '{\"UUID\" : \"0f14c682-96e7-11e6-ae22-56b6b6499611\"}';
	xhr.send(sendString);
	Ti.API.info('katanaJsonData Response' + katanaJsonData);

};

Ti.App.addEventListener("app.loadJSON", function(data) {
	Alloy.Globals.katanaContacted = true;
	Ti.API.info('Event listner fired katanaContacted set to : ' + Alloy.Globals.katanaContacted);
	Alloy.Globals.katanaContacts = data.responseText;
	Ti.API.info('Event listner fired: ' + Alloy.Globals.katanaContacts);
	//Ti.include('lib/tikatana.js');
	//emailContacts(Alloy.Globals.katanaContacts);
	init();
});

/**
 * End Get JSON frmo Katana
 */