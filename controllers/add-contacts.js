// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var isProjectContactsPD = false;
var projectTitle = '';
function init() {

	var gargs = require('getArgsValue');
	projectTitle = gargs.getArgsValue('projectInfo', args);
	gargs = null;

	contacts = JSON.parse(Alloy.Globals.katanaContacts).users;

	$.lblAmountSelected.text = 'You\'ve selected 0/' + contacts.length + ' contacts';
	loadList();
}

function loadList() {
	var data = [];
	var isCorrectProject = false;
	var intTotalProjectContacts = 0;
	if (Alloy.Globals.nnProjectContacts.length > 0) {
		for (var i = 0; i < Alloy.Globals.nnProjectContacts.length; i++) {
			if (Alloy.Globals.nnProjectContacts[i].projectName === projectTitle) {
				intTotalProjectContacts= intTotalProjectContacts +1;
				isCorrectProject = true;
				data.push({

					properties : {
						title : Alloy.Globals.nnProjectContacts[i].fullName,
						//contactJSON : Alloy.Globals.nnProjectContactsPerDay[i].contactJSON,
						color: 'black',
						itemId : i,
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					}
				});
			}
		}
		if (isCorrectProject === true) {
			//$.lblAmountSelected.text = 'You\'ve selected ' + Alloy.Globals.nnProjectContacts.length + '/' + contacts.length + ' contacts';
			$.lblAmountSelected.text = 'You\'ve selected ' + intTotalProjectContacts + '/' + contacts.length + ' contacts';
			$.lsContacts.setItems(data);
		}

	}
}

function projectDone() {
	var gargs = require('getArgsValue');
	if (gargs.getArgsValue('isProjectContactsFromPD', args) === "true") {
		isProjectContactsPD = true;
	}
	gargs = null;

	if (isProjectContactsPD === false) {
		Alloy.Globals.Navigator.open("deadline", args);
	} else {
		Alloy.Globals.Navigator.open("pd", args);
	}

}

function addNew() {
	var margs = require('manageArgs');
	args = margs.manageArgs('isProjectContacts', "true", args);
	args = margs.manageArgs('projectInfo', projectTitle, args);
	margs = null;

	Alloy.Globals.Navigator.open("directory", args);

}

init();

function onItemClick(e) {
	var _args = Alloy.Globals.nnProjectContacts[parseInt(e.itemId)].contactJSON || {};
	_args['projectName'] =  projectTitle;
	Alloy.Globals.Navigator.open("profile", _args);
}

