const cds = require('@sap/cds')

module.exports = cds.service.impl(async function () {
    const { Certificates } = cds.entities;

    this.before(['UPDATE', 'INSERT'], 'Purchases', async req => {
        let purchase = req.data
        purchase.ID = req.ID
        const tx = cds.tx(req)

        purchase.certificates = await countCertificatesCost(purchase.certificates, tx)

        return purchase;
    });

    async function countCertificatesCost(purchaseCertificates, tx) {
        purchaseCertificates = flattenPurchaseCertificates(purchaseCertificates)

        let certificateIDs = purchaseCertificates.map(certificate => certificate.certificate_ID)
        let certificates = await tx.run(SELECT.from(Certificates).where({ ID: certificateIDs }))

        purchaseCertificates.forEach(certificate => {
            certificates.forEach(cert => {
                if (cert.ID === certificate.certificate_ID) {
                    certificate.cost = certificate.count * cert.price
                }
            })
        });

        return purchaseCertificates
    }

    function flattenPurchaseCertificates(purchaseCertificates) {
        let distinctPurchaseCertificates = [];
        purchaseCertificates = [...purchaseCertificates]
        for (let i = 0; i < purchaseCertificates.length; i++) {
            let certificate = { ...purchaseCertificates[i] };
            distinctPurchaseCertificates.push(certificate)
            for (let j = i + 1; j < purchaseCertificates.length; j++) {
                if (certificate.certificate_ID === purchaseCertificates[j].certificate_ID) {
                    certificate.count += purchaseCertificates[j].count
                    purchaseCertificates.splice(j, 1)
                    j--
                }
            }
        }
        return distinctPurchaseCertificates
    }
})
