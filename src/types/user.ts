export interface UserProps {
  id: number;
  username: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  skillsets: string[];
  hobby: string[];
}
