
export class LoginRequest {
    email: string;
    password: string;
}

export class GuestLoginRequest {
    email: string;
    staffId: string;
}

export class ChangePasswordReq {
    adminID: number;
    newpassword: string;
    oldpassword: string;
}