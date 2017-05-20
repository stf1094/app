// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var args = [];

function init() {
	getProjects();
}

function navToExistingProjectTile1(e) {
	var sProjectTitle = '';
	var margs = require('manageArgs');
	if (OS_IOS) {
		sProjectTitle = e.source.value;
	} else {
		var item = e.section.getItemAt(e.itemIndex);
		sProjectTitle = item.lblProjectName1.text;
		//Ti.API.info('THE ITEM VALUE: '  + item.lblProjectName1.text);

	}
	args = margs.manageArgs('projectInfo', sProjectTitle, args);
	margs = null;
	Alloy.Globals.Navigator.open('pd', args);
}
function navToExistingProjectTile2(e) {
	var sProjectTitle = '';
	var margs = require('manageArgs');
	if (OS_IOS) {
		sProjectTitle = e.source.value;
	} else {
		var item = e.section.getItemAt(e.itemIndex);
		sProjectTitle = item.lblProjectName2.text;
		//Ti.API.info('THE ITEM VALUE: '  + item.lblProjectName1.text);

	}
	args = margs.manageArgs('projectInfo', sProjectTitle, args);
	margs = null;
	Alloy.Globals.Navigator.open('pd', args);
}

function createNewProject() {
	Alloy.Globals.Navigator.open("project-name-type", args);
}

//Use modulus
function isEven(n) {
	return n % 2 == 0;
}

//Use modulus
function isOdd(n) {
	return Math.abs(n % 2) == 1;
}

function getProjects() {
	var sections = [];
	var dataToAdd = preprocessForListView();
	var section = Ti.UI.createListSection({
		//headerView : sectionHeader
	});
	section.items = dataToAdd;
	sections.push(section);
	$.lvProjects.sections = sections;

}

function preprocessForListView(obj) {

	var projectItems = [];
	var projectPair = '';
	var data = [];

	var isVisible = 'false';
	if (Alloy.Globals.nnProject.length > 0) {
		var lblProject1 = '';
		var lblProject2 = '';
		for (var i = 0; i < Alloy.Globals.nnProject.length; i++) {

			if (isEven(i) === true) {
				lblProject1 = Alloy.Globals.nnProject[i].projectName;
				projectPair = lblProject1;

				if (i === Alloy.Globals.nnProject.length - 1) {
					Ti.API.info('One on one row:' + projectPair);
					projectItems.push(lblProject1 + '|');
				}
			} else {
				lblProject2 = Alloy.Globals.nnProject[i].projectName;
				projectPair = lblProject1 + '|' + lblProject2;
				Ti.API.info('Two on one row:' + projectPair);
				projectItems.push(projectPair);
				lblProject1 = '';
				lblProject2 = '';
			}
		}

		for (var i = 0; i < projectItems.length; i++) {
			var lbls = [];
			lbls = projectItems[i].split('|');
			if (lbls[1] > '') {
				isVisible = 'true';
			}
			data.push({
				template : "projectTemplate",
				properties : {
					height : 180,
					selectedBackgroundColor : '#ffffff'
				},
				lblProjectName1 : {
					text : lbls[0],
					visible : 'true'
				},
				ivProjectImage1 : {
					class : 'project-holder',
					visible : 'true',
					value : lbls[0],
					id : lbls[0]
				},
				lblProjectName2 : {
					text : lbls[1],
					visible : isVisible
				},
				ivProjectImage2 : {
					class : 'project-holder',
					visible : isVisible,
					value : lbls[1],
					id : lbls[1]
				}
			});
			isVisible = 'false';
		}

		return data;
	}
}

init();
