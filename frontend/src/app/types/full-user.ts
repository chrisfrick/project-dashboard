import { Company } from './company';
import { Team } from './team';

export interface FullUser {
  id?: number;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  isAdmin: boolean;
  active: boolean;
  status: string;
  companies: Company[];
  teams: Team[];
}
