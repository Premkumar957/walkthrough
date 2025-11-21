sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.Sample", {
        onInit() {
            this.getView().setModel(new JSONModel({
                checkBox: {
                    option1: false,
                    option2: false,
                    option3: false,
                    option4: false
                },
                selectedGender: "F"
            }), "checkModel")
        },
        onNavBack() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }
        },
        onRequirementSelect() {
            console.log("hi");
        },
        onSelectRadio: function (oEvent) {
            const oGroup = oEvent.getSource();                // The RadioButtonGroup
            const iIndex = oGroup.getSelectedIndex();         // Selected index (0,1,2)
            const sText = oGroup.getButtons()[iIndex].getText(); // Selected text

            // Map visible text → actual key value
            const keyMap = {
                "Male": "M",
                "Female": "F",
                "Transgender": "T"
            };

            const sKey = keyMap[sText];   // Convert text to key

            // Write key back into model
            this.getView()
                .getModel("checkModel")
                .setProperty("/selectedKey", sKey);

            console.log("Selected Index:", iIndex);
            console.log("Selected Text:", sText);
            console.log("Selected Key:", sKey);
        }


    })
})