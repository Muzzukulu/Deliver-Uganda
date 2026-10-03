const API_URL = "http://127.0.0.1:8000/api";

export async function api(path, method="GET", body=null) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  return res.json();
}