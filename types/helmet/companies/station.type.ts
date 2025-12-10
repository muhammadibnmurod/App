interface HelmetStation {
  id: number;
  station: string;
  number_cameras: number;
  warning: number;
  status: "good" | "average" | "bad";
  icon: string;
}

export type { HelmetStation };
