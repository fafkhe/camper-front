const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function apiGet(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { ...getAuthHeaders() },
  });
  return handleResponse(res);
}

export async function apiPost(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function apiPut(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function apiDelete(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  return handleResponse(res);
}

export async function apiUpload(endpoint: string, formData: FormData) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { ...getAuthHeaders() },
    body: formData,
  });
  return handleResponse(res);
}
