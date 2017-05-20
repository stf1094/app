/**
 * @author William Westgroves
 * Utility class for managing getting args values between navigation.
 *
 */
var getArgsValue = {
	getArgsValue : function _getArgsValue(key, args) {

		for (var i = 0; i < args.length; i++) {
			var argsIN = args[i] || {};
			//var argName = [];
			//argName = argsIN;
			if (argsIN.hasOwnProperty(key)) {
				var argName = [];
				argName = argsIN;
				return argName[key];
			}
		}

	}
};

module.exports = getArgsValue;
