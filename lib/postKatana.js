/**
 * @author William Westgroves
 * Utility class for managing data to and from the Katana server.
 */
var postKatana = {
	postToKatana : function _postToKatana(jsonString, appSrc) {
		var url = Alloy.Globals.KatanaPathURL + "contacts/v1.0/load";
		Ti.API.info("postKatana URI: " + url);
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
				Ti.API.info("Error occured");
				//alert('error');
			},
			timeout : 15000 // in milliseconds
		});
		// Prepare the connection.
		client.open("POST", url);
		client.setRequestHeader("Content-Type", "application/json");
		client.setRequestHeader('charset', 'utf-8');

		//var sendString = '{\"users\": ' + jsonString + ',\"UUID\" : \"' + Alloy.Globals.NetworkNinjaUUID + '\" ,\"CustomerID\" : ' + Alloy.Globals.CustomerID + ',\"DataOrigin\" : \"' + appSrc + '\"}';
		var sendString = '{\"users\": ' + jsonString + ',\"UUID\" : \"' + Alloy.Globals.NetworkNinjaUUID + '\" ,\"CustomerID\" : ' + Alloy.Globals.CustomerID + ',\"DataOrigin\" : \"' + appSrc + '\"}';

		// Send the request.
		client.send(sendString);
	}
};

module.exports = postKatana;
