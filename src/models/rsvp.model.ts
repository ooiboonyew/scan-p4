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
  totalUserAttended: number;
  totalGuestAttended: number;
  totalUser: number;
  totalBoothActivies: totalBoothActivity[];
  sumTotalBoothActivies: totalBoothActivity;
}

export class totalBoothActivity {
  boothNum: number;
  chancesUsed: number;
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
  name: string;
  division: string;
  from: string;
  designation: string;
  otherDesignation: string;
  organisation: string;
  zone: string;
  school: string;
  cluster: string;
  otherDivision: string;
  otherFrom: string;
  email: string;
  mobile: string;
  attending: string;
  dietary: string;
  otherDieraty: string;
  dataProdection: string;
  covidStatus: string;
  otherCovidStatus: string;
  parking: string;
  createdDate: object;
  emailDate: object;
}
