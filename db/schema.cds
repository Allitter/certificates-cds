namespace com.certificates;

using {
    managed,
    temporal,
    User,
    cuid
} from '@sap/cds/common';

@assert.unique: {certifciateName: [name]}
entity Certificates : managed, cuid {
    name        : String(255);
    description : String(1024);
    price       : Integer;
    duration    : Integer;
    tags        : Composition of many Tags
                      on tags.certificate = $self;
}

entity Tags : cuid {
    name        : String;
    certificate : Association to Certificates;
}

entity Purchases : managed, cuid {
    customer     : User @cds.on.insert: $user;
    certificates : Composition of many PurchaseCertificates
                       on certificates.purchase = $self;
}

entity PurchaseCertificates {
    key certificate : Association to Certificates;
    key purchase    : Association to Purchases;
        count       : Integer;
        cost        : Integer;
}
