sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.Overview", {
        onOpenTable() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("table");
            console.log("Navigating to Table view");
        },
        onOpenComboBox() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("comboBox");
            console.log("Navigating to ComboBox view");
        }
    })
})