/**
 * @author William Westgroves
 * Utility class for getting local data between syncs or if the service is down.
 * Allows the user to work 'off line'.
 * module= localContacts, localProjects, etc...
 */
var getLocalData = {
	getLocalData : function _getLocalData(module) {

		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, module + '.json');
		try {
			var contents = f.read();
			Ti.API.info('Output as a blob: ' + contents);
			return contents.text;

		} catch(err) {
			if (module == 'localContacts') {
				return '{"users": [{"favorite": false,"latitude": 0,"longitude": 0,"photo": "","bubbleParent": true,"email": {},"firstName": "NOT IN SYNC","lastName": "SYSTEM"}]}';
			}else{
				return 'NULL';
			}
		}
	}
};

module.exports = getLocalData;
