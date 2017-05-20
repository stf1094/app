// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

init();

function ini1t() {
	
	var itemTemplate = {
		properties : {
			title : 'Alvarium Systems',
			subtitle : '',
			//image : "/images/profile_default/default_profile_image.jpg",
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
		},
		events : {
			// Bind event callbacks for bubbled events
			// Events caught here are fired by the subcomponent views of the ListItem
			//click: clickCB
		},
		childTemplates : [// Add view subcomponents to the ListItem
		{
			// Display a Label
			type : 'Ti.UI.Label',
			// If there is a rowtitle dictionary in the ListDataItem,
			// that data binds with this view subcomponent
			bindId : 'rowtitle',
			properties : {
				// Set view properties for the Label view subcomponent
				title : 'BLUBBER',
				font : {
					class : 'icon icon-btn icon-facebook'
				}
			},
			events : {
				// Bind event callbacks only to the subcomponent
				// click: clickCB
			},
			childTemplates : [
			// View subcomponents can also have subcomponents
			],
		}
		// ...add more components
		]
	};

	var data = [{
		properties : {
			title : 'Alvarium Systems',
			subtitle : '',
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
		},
		childTemplates : [// Add view subcomponents to the ListItem
		{
			// Display a Label
			type : 'Ti.UI.Label',
			// If there is a rowtitle dictionary in the ListDataItem,
			// that data binds with this view subcomponent
			bindId : 'rowtitle',
			properties : {
				// Set view properties for the Label view subcomponent
				title : 'BLUBBER',
				font : {
					class : 'icon icon-btn icon-facebook'
				}
			}
		}]
		//template : Ti.UI.LIST_ITEM_TEMPLATE_DEFAULT
	}, {
		properties : {
			title : 'William Westgroves',
			subtitle : 'Ok. See you tomorrow...',
			image : "/images/profile_default/default_profile_image.jpg",
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK
		},
		template : Ti.UI.LIST_ITEM_TEMPLATE_SETTINGS
	}, {
		properties : {
			title : 'Brian Dalmaso',
			subtitle : 'I called earlier and...',
			image : "/images/profile_default/default_profile_image.jpg",
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK
		},
		template : Ti.UI.LIST_ITEM_TEMPLATE_SETTINGS
	}, {
		properties : {
			title : 'Kate Smith',
			subtitle : 'Hey! I just wanted to...',
			image : "/images/profile_default/default_profile_image.jpg",
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK
			//label: class="icon icon-btn icon-facebook"
		},
		template : Ti.UI.LIST_ITEM_TEMPLATE_SETTINGS
	}, {
		properties : {
			title : 'Dave Franco',
			subtitle : 'The VPN is down and ....', // not used by this template
			image : "/images/profile_default/default_profile_image.jpg",
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK
		},
		template : Ti.UI.LIST_ITEM_TEMPLATE_SETTINGS
	}];
	var win = $.win;
	var listSection = $.ListSection1;
	listSection.items = data;
	//	var lv1 = $.ListView_1;
	//win.add(lv1);

}

function init() {

	//Get the data...
	var data = [];
	data.push({
		rowtitle : {
			text : 'Project Name: Alvarium Systems',
		},
		properties : {
			center : 'true',
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
		}
	});
	for (var i = 0; i < 1; i++) {
		data.push({
			// Maps to the rowtitle component in the template
			// Sets the text property of the Label component
			rowtitle : {
				text : 'John Doe' + String.fromCharCode(13) + String.fromCharCode(9) + "I need to know..." + (i + 1),
				//subtitle :'The message... ' + (i + 1)
			},
			comType : {
				properties : {
					font : {
						class : 'icon icon-btn icon-facebook'
					}
				}
			},
			// Sets the regular list data properties
			properties : {

				itemId : 'row' + (i + 1),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK
			}
		});
	}

	var plainTemplate = {
		childTemplates : [{
			type : 'Ti.UI.Label', // Use a label
			bindId : 'rowtitle', // Bind ID for this label
			properties : {// Sets the Label.left property
				left : '1%'
			}
		}, {
			type : 'Ti.UI.Label', // Use an image view
			bindId : 'comType', // Bind ID for this image view
			properties : {// Sets the ImageView.image property
				left : '40%',
				font : {
					class : 'icon icon-btn icon-facebook'
				}
			}
		}, {
			type : 'Ti.UI.Button', // Use a button
			bindId : 'button', // Bind ID for this button
			properties : {// Sets several button properties
				width : '80dp',
				height : '30dp',
				right : '10dp',
				//title : 'press me'
				font : {
						class : 'icon icon-btn icon-facebook'
					}
			},
			events : {
				//click : report
			} // Binds a callback to the button's click event
		}]
	};

	var listView = Ti.UI.createListView({
		// Maps the plainTemplate object to the 'plain' style name
		title : 'Alvarium Systems',
		templates : {
			'plain' : plainTemplate
		},
		// Use the plain template, that is, the plainTemplate object defined earlier
		// for all data list items in this list view
		//top : '35%',

		defaultItemTemplate : 'plain'
	});

	var listView2 = Ti.UI.createListView({
		// Maps the plainTemplate object to the 'plain' style name
		title : 'Alvarium Systems',
		templates : {
			'plain' : plainTemplate
		},
		// Use the plain template, that is, the plainTemplate object defined earlier
		// for all data list items in this list view
		//top : '35%',

		defaultItemTemplate : 'plain'
	});

	//var scrollView = $.scrollableView;
	var win = $.win;
	//var lv1 = $.ListView_1;
	//lv1.templates = plainTemplate;
	var section = Ti.UI.createListSection({
		items : data
	});
	listView.sections = [section];

	var sv1 = Ti.UI.createScrollableView({
		// Use the plain template, that is, the plainTemplate object defined earlier
		// for all data list items in this list view

		top : '35%',
		//height : "100%",
		horizontalBounce : "true",
		id : "scrollView",
		showHorizontalScrollIndicator : "true",
		showVerticalScrollIndicator : "true",
		views : [listView, listView2],
		width : "100%"
	});

	//sv1.add(listView);

	win.add(sv1);

}

function loadData() {

}

