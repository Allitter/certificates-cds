sap.ui.define(
    [
        "sap/fe/core/AppComponent",
        "sap/ui/model/json/JSONModel"
    ],
    function (Component, JSONModel) {
        "use strict";

        return Component.extend("ns.certificates.Component", {
            metadata: {
                manifest: "json",
            },
            init: function () {
                Component.prototype.init.apply(this, arguments);

                let cartModel = new JSONModel({
                    certificates: new Map()
                })

                sap.ui.getCore().setModel(cartModel, "cart")

                this.getRouter().initialize();
            }
        });
    }
);