export class Admin {
  adminID: number;
  name: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
}

export class User {
  id: string;
  num: number;
  staffId: string;
  email: string;
  name: string;
  createdDate: object;
  userBooths: UserBooth[];
  guestAttend: number;
  guestAvailable: number;
  userAvailable: number;
  userAttend: number;
}

export class UserBooth {
  boothNum: number;
  boothName: string;
  chancesTotal: number;
  chancesLeft: number;
  // status: number;
}

export class Booth {
  id: string;
  boothNum: number;
  boothName: string;
  secretDigit: string;
  boothLink: string;
  status: number;
}

export class BoothActivities {
  id: string;
  boothNum: number;
  userId: string;
  name: string;
  staffId: string;
  email: string;
  chancesLeft: number;
  status: number;
  createdDate: object;
}

export class Summary {
  totalUserAttended: number;
  totalGuestAttended: number;
  totalUser: number;
  totalUserBooths: TotalUserBooth[];
  sumTotalUserBooths: TotalUserBooth;
}

export class TotalUserBooth {
  boothNum: number;
  totalChances: number;
  chancesLeft: number;
  chancesUsed: number;
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
