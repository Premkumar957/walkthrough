sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
        onInit() {
            const oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view");
            console.log("InvoiceList controller initialized");
        },
        onFilterInvoices(oEvent) {
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
                if (!isNaN(sQuery)) {
                    // user typed a number → filter by price
                    aFilter.push(
                        new Filter("ExtendedPrice", FilterOperator.LE, Number(sQuery))
                    );
                } else {
                    // user typed text → filter by product name
                    aFilter.push(
                        new Filter("ProductName", FilterOperator.Contains, sQuery)
                    );
                }
            }
            const oList = this.byId("invoiceList");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        onPress(oEvent) {
            const oItem = oEvent.getSource();
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substring(1))
            });
        }
    });
});