/**
 * @author William Westgroves
 * Utility class for getting local identity of user.
 * If the userIdentity.json file does not exist then prompt the user to bounce
 * credentials off of Magento.
 */
var getUserIdenity = {
	getUserIdenity : function _getUserIdenity() {

		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'userIdentity.json');
		try {
			var contents = f.read();
			Ti.API.info('Content of ID File:' + contents.text);
			Alloy.Globals.Identity = contents.text;
			Ti.API.info("Content of ID ID Global:" + Alloy.Globals.Identity);
			var jsonObject = JSON.parse(Alloy.Globals.Identity);
			
			var details = jsonObject.CustomerInformation[0];
			Alloy.Globals.CustomerID =  details.CustomerID;
			Alloy.Globals.NetworkNinjaUUID = details.NetworkNinjasUUID;
			Alloy.Globals.AccountHolderName = details.AccountHoldersName;
			return true;
		} catch(err) {
			return false;
		}
	}
};

module.exports = getUserIdenity;
