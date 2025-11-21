sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/date/UI5Date",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/library"
], (Controller, History, UI5Date, JSONModel, CoreLibrary) => {
    "use strict";

    const ValueState = CoreLibrary.ValueState
    return Controller.extend("ui5.walkthrough.controller.DateAndTime", {
        onInit() {
            let oModel = new JSONModel()

            oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

            const now = new Date();
            console.log(now);
            let dateFrom = UI5Date.getInstance(now.getFullYear(), now.getMonth(), now.getDate());
            let dateTo = UI5Date.getInstance(now.getFullYear(), now.getMonth(), now.getDate()+1);

            oModel.setData({
                valueDP1: UI5Date.getInstance(2024, 3, 30),
                valueDP2: UI5Date.getInstance(2025, 10, 29),
                valueDP3: UI5Date.getInstance(),
                start: dateFrom,
                end: dateTo,
                TP1: {
                    value: "19.15",
                    format: "HH:mm"
                }
            })
            this.getView().setModel(oModel, "oModel");
        },
        onNavBack() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash()

            if (sPreviousHash !== undefined) {
                window.history.go(-1)
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }

        },
        handleChange(oEvent) {
            const oDP = oEvent.getSource();
            const bValid = oEvent.getParameter("valid");
            const sValue = oEvent.getParameter("value");

            if (bValid) {
                oDP.setValueState(ValueState.None);
            } else {
                oDP.setValueState(ValueState.Error);
            }

        },
        handleDateRangeChange(oEvent) {
            var sFrom = oEvent.getParameter("from"),
                sTo = oEvent.getParameter("to"),
                bValid = oEvent.getParameter("valid"),
                oEventSource = oEvent.getSource()

            if (bValid) {
                oEventSource.setValueState(ValueState.None);
            } else {
                oEventSource.setValueState(ValueState.Error);
            }
        },
        handleTimePickerChange(oEvent) {
            const oTP = oEvent.getSource();
            const sValue = oEvent.getParameter("value");
            const bValid = oEvent.getParameter("valid");

            if (bValid) {
                oTP.setValueState(ValueState.None);
            } else {
                oTP.setValueState(ValueState.Error);
            }

        }
    })
})