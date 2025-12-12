import { IconBarChart, IconList, IconMap, IconMessage, IconWagon } from "#components";
import { PERMISSION_KEYS, type PermissionKey } from "@/types";
import type { VueI18nTranslation } from "vue-i18n";

type NavigationKey = "scales" | "camera" | "helmet" | "app" | "chat";

interface NavigationRoute {
  title: string;
  pageTitle?: string;
  icon: any;
  route: string;
  permission: PermissionKey
}

interface NavigationSection {
  name: string;
  route: string;
  isActive: boolean;
  routes: NavigationRoute[];
}

type NavigationReturn = Record<NavigationKey, NavigationSection[]>;

export const navigation = (t: VueI18nTranslation): NavigationReturn => {
  return {
    scales: [
      {
        name: "scales",
        route: "/scales",
        isActive: true,
        routes: [
          {
            title: t("statistic.title"),
            pageTitle: t("wagon.statistics"),
            icon: IconBarChart,
            route: "/statistics",
            permission: PERMISSION_KEYS.WAGON_SCALE_DASHBOARD
          },
          {
            title: t("station.plural"),
            icon: IconMap,
            route: "/stations",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          },
          {
            title: t("wagon.plural"),
            icon: IconWagon,
            route: "/wagons",
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          },
          {
            title: t("wagon.listAll"),
            icon: IconList,
            route: "/all-wagons",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          }
        ]
      }
    ],
    camera: [
      {
        name: "camera",
        route: "/camera",
        isActive: true,
        routes: [
          {
            title: t("statistic.title"),
            pageTitle: t("camera.statistics"),
            icon: IconBarChart,
            route: "/statistics",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          },
          {
            title: t("wagons.title"),
            icon: IconMap,
            route: "/wagons",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          }
        ]
      }
    ],
    helmet: [
      {
        name: "helmet",
        route: "/helmet",
        isActive: true,
        routes: [
          {
            title: t("statistic.title"),
            pageTitle: t("camera.statistics"),
            icon: IconBarChart,
            route: "/statistics",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          },
          {
            title: t("camera.list"),
            icon: IconMap,
            route: "/cameras",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          },
          {
            title: t("camera.companies"),
            icon: IconWagon,
            route: "/companies",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          }
        ]
      }
    ],
    app: [
      {
        name: "app",
        route: "/app",
        isActive: true,
        routes: [
          {
            title: t("app.users"),
            pageTitle: t("app.users"),
            icon: IconBarChart,
            route: "/users",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          },
          {
            title: t("app.roles"),
            pageTitle: t("app.roles"),
            icon: IconMap,
            route: "/roles",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          }
        ]
      }
    ],
    chat: [
      {
        name: "chat",
        route: "/chat",
        isActive: true,
        routes: [
          {
            title: t("chat.title"),
            pageTitle: t("chat.title"),
            icon: IconMessage,
            route: "/new-chat",
            // #FIX missing permission key
            permission: PERMISSION_KEYS.LIST_WAGON_SCALES
          },
        ]
      }
    ],
  };
};
