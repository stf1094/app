/**
 * @author William Westgroves
 * Utility class for managing local data between syncs.
 * module= localContacts, localProjects, etc...
 */
var logLocalData = {
	logLocalData : function _logLocalData(jsonDataString, module) {

		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, module + '.json');
		//Clear out the file if there is data inside.
		if (f.exists() && f.writeable) {
			var success = f.deleteFile();
			Ti.API.info((success == true) ? 'success' : 'fail');
			// outputs 'success'
		}

		

		f.write(jsonDataString);
		Ti.API.info(jsonDataString);

	}
};

module.exports = logLocalData;
