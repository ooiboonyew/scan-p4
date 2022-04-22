export class Admin {
    adminID: number;
    name: string;
    email: string;
    password: string;
    isSuperAdmin: boolean;
}

export class RSVP {
    rsvpID: number;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    organization: string;
    function: string;
    brand: string;
    createdDate: Date;
}