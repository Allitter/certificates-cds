using com.certificates as entitites from '../db/schema';

service CertificateService {
    @(restrict: [
        {
            grant: 'READ',
            to   : 'any'
        },
        {
            grant: '*',
            to   : 'Administrator'
        }
    ])
    entity Certificates         as projection on entitites.Certificates;

    @(restrict: [
        {
            grant: 'READ',
            to   : 'any'
        },
        {
            grant: '*',
            to   : 'Administrator'
        }
    ])
    entity Tags                 as projection on entitites.Tags;

    @(restrict: [
        {
            grant: [
                'READ',
                'CREATE',
                'DELETE'
            ],
            to   : 'Customer',
            where: 'customer = $user'
        },
        {
            grant: '*',
            to   : 'Administrator'
        }
    ])
    entity Purchases            as
        select from entitites.Purchases {
            *,
            sum(
                certificates.cost
            ) as cost : Integer
        }
        group by
            ID;

    @(restrict: [
        {
            grant: [
                'READ',
                'CREATE',
                'DELETE'
            ],
            to   : 'Customer',
            where: 'customer = $user'
        },
        {
            grant: '*',
            to   : 'Administrator'
        }
    ])
    entity PurchaseCertificates as projection on entitites.PurchaseCertificates {
        *,
        certificate.name as certificateName
    };

    @(reqires: 'Customer')
    action Order(ID : Integer, certificates : array of PurchaseCertificates) returns Purchases;


    annotate CertificateService.Certificates with {
        name        @(mandatory);
        description @(mandatory);
        price       @(mandatory);
        duration    @(mandatory);
        tags        @(cds.autoexpand);
        createdAt   @(readonly);
        createdBy   @(readonly);
        modifiedBy  @(readonly);
        modifiedAt  @(readonly);
    };

    annotate CertificateService.Tags with {
        name        @(mandatory);
        certificate @(
            mandatory,
            assert.integrity
        );
    }

    annotate CertificateService.Purchases with {
        cost         @(readonly);
        customer     @(readonly);
        certificates @(
            mandatory,
            assert.notNull
        );
        createdAt    @(readonly);
        createdBy    @(readonly);
        modifiedAt   @(readonly);
        modifiedBy   @(readonly);
    }

    annotate CertificateService.PurchaseCertificates with {
        cost        @readonly;
        certificate @(
            mandatory,
            assert.integrity
        );
        purchase    @(assert.integrity);
        count       @(
            mandatory,
            assert.range: [
                1,
                1000
            ]
        );
    }
}
