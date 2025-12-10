export interface AdminUser {
  id: string;
  username: string;
  password: string; // In a real application, this would be hashed
  email: string;
  createdAt: Date;
}