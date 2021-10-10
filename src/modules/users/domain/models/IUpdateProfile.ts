export interface IUpdateProfile {
  user_id: string;
  name: string;
  email: string;
  newPassword?: string;
  oldPassword?: string;
}
