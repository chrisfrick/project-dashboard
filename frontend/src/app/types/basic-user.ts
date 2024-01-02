export interface BasicUser {
  id?: number;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  isAdmin: boolean;
  active: boolean;
  status: boolean;
}
