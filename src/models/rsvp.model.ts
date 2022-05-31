export class Admin {
  adminID: number;
  name: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
}


export class User {
  id: string;
  staffId: string
  email: string;
  name: string;
  createdDate: object;
  booths: Booth[];
  guestAttend: number
  guestAvailable: number
  userAttend: number
}


export class UserBooth {
  id: string;
  num: number;
  chancesTotal: number;
  chancesLeft: number;
  status: number;
}

export class Booth {
  id: string;
  num: number;
  secret: string;
}

export class RSVP {
  id: string;
  num: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  country: string;
  attending: number;
  createdDate: object;
  emailDate: object;
}
