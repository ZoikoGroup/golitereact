"use server";

export async function orderByUserAction(email: string) {
  try {
    const res = await fetch(
      "https://goliteapi.golitemobile.com/api/v2/order/by-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logged_user: email,
        }),
      }
    );

    const data = await res.json();

    if (!data.status) {
      return { status: false, error: "No order found" };
    }

    return { status: true, data };
  } catch (err) {
    return { status: false, error: "Server error" };
  }
}
