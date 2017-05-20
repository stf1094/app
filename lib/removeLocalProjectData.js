/**
 * @author William Westgroves
 * Utility class for deleting project data
 * 
 */
var removeLocalProjectData = {
	removeLocalProjectData : function _removeLocalProjectData(module) {

		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, module + '.json');
		try {
			if (f.exists()) {
				var success = f.deleteFile();
				alert('true');
				return true;
			}

		} catch(err) {
alert('false');
			return false;

		}
	}
};

module.exports = removeLocalProjectData;
