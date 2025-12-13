export interface AdminUser {
  id: string;
  username: string;
  password?: string; // Optional for Firebase authentication
  email: string;
  createdAt: Date;
}