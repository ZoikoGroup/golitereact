export async function checkDeviceCompatibility(imei: string) {
  const res = await fetch("/api/check-device", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: imei }),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.message);

  return data;
}
