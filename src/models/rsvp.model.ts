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
  email: string;
  createdDate: object;
  guestAttend: number;
  guestAvailable: number;
  userAvailable: number;
  userAttend: number;
  chancesTotal: number;
  chancesLeft: number;
  lastCheckInDate: object;
}

export class Setting {
  annoucement: string;
  showLuckyDrawPage: boolean;
  showPhotoPage: boolean;
  showVotingPage: boolean;
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
  totalGuest: number;
  totalLocation: number;
  totalOut: number;
  totalIn: number;
  totalLive: number;
}

export class RSVP {
  id: string;
  num: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  category: string;
  data1: string;
  data2: string;
  data3: string;
  data4: string;
  data5: string;
  qr: string;
  createdDate: object;
  checkedIn: boolean;
  checkedInDate: object;
}

export class RSVP_Scan {
  id: string;
  num: number;
  qr: string;
  location: string;
  sublocation: string;
  createdDate: object;
}

export class Config {
  id: string;
  location: string;
  sublocation: string;
}
