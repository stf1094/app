/**
 * @author William Westgroves
 * Utility class for managing args between navigation.
 *
 */
var manageArgs = {
	manageArgs : function _manageArgs(key, value, args) {

		for (var i = 0; i < args.length; i++) {
			var argsIN = args[i] || {};
			var argName = [];
			argName = argsIN;
			if (argName.hasOwnProperty(key)) {
				delete args[i];
			}
		}

		
		var keyValuePairObj = {};
		keyValuePairObj[key] = value;
		args.push(keyValuePairObj);
		return args;

	}
};

module.exports = manageArgs;
