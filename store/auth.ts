import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import type { Nullable } from '@/types/common';
import type { components } from '@/api/apiMethods.types';
import type { PermissionEnum } from '@/constants/permissions';

type Organization = components['schemas']['RGetOrganDto'];

export type UserInfo = components['schemas']['ProfileDto'];

// export interface UserInfo {
//   id: string;
//   login: string;
//   firstName: string;
//   lastName: string;
//   middleName: string;
//   jshshir: string;
//   avatar: string;
//   card: string;
//   workerId: string;
//   birthDay: string;
//   photo: string;
//   sex: string;
//   phone: string[];
// }

interface UserRole {
    id: string;
    name: string;
    permissions: PermissionEnum[];
}

export const useUserStore = defineStore('user', {
    state: () => ({
        loaded: false,
        userInfo: null as Nullable<UserInfo>,
        isAuthenticated: Cookies.get('isAuthenticated') === 'true',
        loading: false,
        darkMode: false,
        pageTitle: '' as string | (() => string),
        userRole: null as Nullable<UserRole>,
        org: null as Nullable<Organization>,
        // gate flag (used by middleware / layout)
        forbidden: false,
    }),
    actions: {
        setForbidden(value: boolean) {
            this.forbidden = value;
        },
        setUserInfo(userInfo?: UserInfo) {
            this.userInfo = userInfo || null;
        },
        setUserOrg(org?: Organization) {
            this.org = org || null;
        },
        setUserLogin(value: boolean) {
            this.isAuthenticated = value;
            Cookies.set('isAuthenticated', value.toString());
        },
        setUserRole(role: any) {
            this.userRole = role;
            Cookies.set('userRole', role);
        },
        setUserRoles(roles: any) {
            this.userRole = roles;
        },
        hasPermission(permission: PermissionEnum) {
            if (!this.userRole) return false;
            return this.userRole.permissions.includes(permission);
        },
        clearUser() {
            this.userInfo = null;

            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            Cookies.remove('isAuthenticated');
        },
        setLoading(value: boolean) {
            this.loading = value;
        },
        setPageTitle(v?: string | (() => string)) {
            this.pageTitle = v || '';
        },
    },
});
