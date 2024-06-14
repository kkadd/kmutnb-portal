export async function HistoryAddFunction(serviceId: string, username: string) {
  await fetch("/api/portal/history/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ serviceId: serviceId, username: username }),
  }).then((res) => {
    if (res.status == 201) {
      console.log("History added");
    } else {
      console.log("History not added");
    }
  });
}
