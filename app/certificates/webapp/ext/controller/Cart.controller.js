sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/Filter"
], function (MessageToast, Controller, JSONModel, Filter) {
    "use strict";

    return Controller.extend("ns.certificates.ext.controller.Cart", {
        onInit: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("cart").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            this.getView().bindElement(``);
        },
        handleLink1Press: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("certificates");
        },
        onViewCertificate: function (oEvent) {
            let certificateID = oEvent.getSource().data().ID
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("certificateInfo", {
                objectId: certificateID
            });
        },
        openPurchaseInfo: function (oEvent) {
            
            let purchaseID = oEvent.getSource().data().ID
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("purchaseInfo", {
                objectId: purchaseID
            });
        },
    });
});