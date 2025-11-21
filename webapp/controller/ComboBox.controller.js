sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], (Controller, JSONModel, History, MessageToast) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.ComboBox", {
        onInit() {
            const oViewModel = new JSONModel({
                name: "",
                comboBoxKey: "",
                selectKey: ""
            });
            this.getView().setModel(oViewModel, "viewModel");
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
        onSelectionChange(oEvent) {
            const oSelectedItem = oEvent.getParameter("selectedItem");

            const { mProperties } = oSelectedItem || {};
            const { additionalText, key, text } = mProperties;


            if (!oSelectedItem) {
                console.log("No item selected, user typed or cleared input.");
                return;
            }
            const sKey = oSelectedItem.getKey();

            this.getView().getModel("viewModel").setProperty("/comboBoxKey", sKey);
        },
        onChangeInput(oEvent) {
            const inputItem = oEvent.getParameter()
        },
        onSelectChange(oEvent) {
            console.log("Hello World!")
        },
        onRequirementSelect(oEvent) {
            console.log("Checkbox clicked"); // test
            const oCheckBox = oEvent.getSource();
            const sText = oCheckBox.getText();
            const bSelected = oCheckBox.getSelected();

            MessageToast.show(`You ${bSelected ? "selected" : "unselected"}: ${sText}`);
            const {mParameters} = oEvent;
            const {selected} = mParameters;
            console.log(`Selected: ${selected}`)
        }


    })
})