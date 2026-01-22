import axios from "axios";

export const checkDeviceCompatibility = (imei: string) => {
  return axios.post("/api/vcare/check-device", { imei });
};

export const activateSim = (payload: any) => {
  return axios.post("/api/vcare/activate-sim", payload);
};

export const submitPortIn = (payload: any) => {
  return axios.post("/api/vcare/port-in", payload);
};

export async function processOrder(postData: Record<string, unknown>) {
  console.log("Processing order with vCare API...", postData);  
}