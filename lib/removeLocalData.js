/**
 * @author William Westgroves
 * Utility class for getting local data between syncs or if the service is down.
 * Allows the user to work 'off line'.
 * module= localContacts, localProjects, etc...
 */
var removeLocalData = {
	removeLocalData : function _removeLocalData(module) {

		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, module + '.json');
		try {
			if (f.exists() && f.writeable) {
				var success = f.deleteFile();
				Ti.API.info((success == true) ? 'success' : 'fail');
				return true;
			}

		} catch(err) {

			return false;

		}
	}
};

module.exports = removeLocalData;
