import axios from "axios";

export const checkDeviceCompatibility = (imei: string) => {
  return axios.post("/api/vcare/check-device", { imei });
};

export const activateSim = (payload: any) => {
  return axios.post("/api/vcare/activate-sim", payload);
};
