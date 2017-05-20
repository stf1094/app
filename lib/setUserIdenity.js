/**
 * @author William Westgroves
 * Utility class for managing local data between syncs.
 * module= localContacts, localProjects, etc...
 */
var logLocalData = {
	logLocalData : function _logLocalData(jsonDataString, module) {

		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,  'userIdenity.json');
		//Clear out the file if there is data inside.
		if (f.exists() && f.writeable) {
			var success = f.deleteFile();
			Ti.API.info((success == true) ? 'success' : 'fail');
			// outputs 'success'
		}

		jsonDataString = '{"AccountHolderName":"William Westgroves","NetworkNinjaUUID":"0f14c998-96e7-11e6-ae22-56b6b6499611", "CustomerID":1}';

		f.write(jsonDataString);

	}
};

module.exports = logLocalData;
