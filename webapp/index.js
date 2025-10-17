sap.ui.define([
	"sap/m/Text",
	"sap/m/Button",
	"sap/m/MessageToast"
], (Text, Button, MessageToast) => {
	"use strict";

	new Text({
		text: "Become the programmer you are meant to be!"
	}).placeAt("content"); 
	new Button({
		text: "Press me",
		type: "Default",
		press: function() {
			MessageToast.show("Button Cliked");
		}
	}).placeAt("content");
});