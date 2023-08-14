const cds = require('@sap/cds');
const crypto = require('crypto');


module.exports = cds.service.impl(async function () {
    const { Certificates } = cds.entities;

    this.before(['UPDATE', 'INSERT'], 'Purchases', async req => {
        let purchase = req.data;
        purchase.ID = crypto.randomUUID();
        const tx = cds.tx(req);

        purchase.certificates = await countCertificatesCost(purchase.certificates, tx);
    });

    async function countCertificatesCost(purchaseCertificates, tx) {
        purchaseCertificates = flattenPurchaseCertificates(purchaseCertificates);

        let certificateIDs = purchaseCertificates.map(certificate => certificate.certificate_ID);
        let certificates = await tx.run(SELECT.from(Certificates).where({ ID: certificateIDs }));

        return countPurchaseCertificateCost(purchaseCertificates, certificates);
    }

    function flattenPurchaseCertificates(purchaseCertificates) {
        let certificates = new Map();
        purchaseCertificates.forEach(certificate => {
            if (certificates.has(certificate.certificate_ID)) {
                certificates.get(certificate.certificate_ID).count += certificate.count
            } else {
                certificates.set(certificate.certificate_ID, certificate)
            }
        });
        return Array.from(certificates.values());
    }

    function countPurchaseCertificateCost(purchaseCertificates, certificates) {
        purchaseCertificates = purchaseCertificates.map(purchaseCertificate => { return { ...purchaseCertificate } });
        
        purchaseCertificates.forEach(purchaseCertificate => {
            certificates.forEach(certificiate => {
                if (certificiate.ID === purchaseCertificate.certificate_ID) {
                    purchaseCertificate.cost = purchaseCertificate.count * certificiate.price;
                }
            });
        });

        return purchaseCertificates;
    }
})
