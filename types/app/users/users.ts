import type { SystemType } from "@/store/main";

interface CreateAccount {
  login: string;
  password: string;
}

interface UserCreateOrganizationFilters {
  type?: "mtu" | "station";
  hasSystem?: boolean;
  systemsAll?: SystemType
  systemsAny?: number;
}

interface UsersFilter {
  login: string;
}

export { type CreateAccount, type UserCreateOrganizationFilters, type UsersFilter }