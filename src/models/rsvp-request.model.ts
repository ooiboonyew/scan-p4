
export class LoginRequest {
    email: string;
    password: string;
}

export class ChangePasswordReq {
    adminID: number;
    newpassword: string;
    oldpassword: string;
}