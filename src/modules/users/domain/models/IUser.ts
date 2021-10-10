export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  getAvatarUrl(): string | null;
}
