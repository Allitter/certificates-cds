sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/Filter"
], function (MessageToast, Controller, JSONModel, Filter) {
    "use strict";

    return Controller.extend("ns.certificates.ext.controller.CertificateInfo", {
        onInit: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("certificateInfo").attachPatternMatched(this._onObjectMatched, this);
           
            let oModel = new JSONModel({
                false: false,
                true: true
            })

            sap.ui.getCore().setModel(oModel, "viewModel")
        },
        _onObjectMatched: function (oEvent) {
            let certificateID = window.decodeURIComponent(oEvent.getParameter("arguments").objectId);
            this.getView().bindElement(`/Certificates(${certificateID})`);
        },
        handleLink1Press: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("certificates");
        },
        onAddToCart: function (oEvent) {
            let ID = oEvent.getSource().data().ID
            let cartModel = sap.ui.getCore().getModel("cart")
            
            if (cartModel.oData.certificates.has(ID)) {
                let count = cartModel.oData.certificates.get(ID)
                cartModel.oData.certificates.set(ID, ++count)
            } else {
                cartModel.oData.certificates.set(ID, 1)
            }
            
            MessageToast.show("Certificate was add to Cart")
        },
        isCertificateInCart: function (ID) {
            let cartModel = sap.ui.getCore().getModel("cart")
            return cartModel.oData.certificates.has(ID)
        }
    });
});