/**
 * @author William Westgroves
 * Utility class for overriding the back button on iOS navigation windows.
 */
var overrideNavigation = {
	overrideNavigation : function _overrideNavigation(obj,windowArgs,buttonLabel, destination) {

	var btnBack = Ti.UI.createButton({
		title : '< ' + buttonLabel,
		color : "blue",
		backgroundImage : "none"
	});

	btnBack.addEventListener('click', function() {
		Alloy.Globals.Navigator.open(destination, windowArgs);
	});

	obj.setLeftNavButton(btnBack);
		
	}
};

module.exports = overrideNavigation;
