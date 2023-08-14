sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/Filter"
], function (MessageToast, Controller, JSONModel, Filter) {
    "use strict";

    return Controller.extend("ns.certificates.ext.controller.Certificates", {
        onInit: function () {
        },

        onViewCertificate: function (oEvent) {
            let certificateID = oEvent.getSource().data().ID
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("certificateInfo", {
                objectId: certificateID
            });
        },
        onViewCart: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("cart");
        },
        onAddToCart: function (certificateID) {
            MessageToast.show("Certificate was add to Cart")
            let cartModel = this.getOwnerComponent().getAggregation("Main").getModel("cartModel")
            cartModel.certifcates.push(certificateID)
            console.log(cartModel)
        }
    });
});