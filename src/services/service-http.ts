type HttpResponse<T> = {
  success?: T;
  error?: string;
};

const BASE_URL = "http://localhost:1126/api/v1";

// GET genérico
export async function getRequest<T>(endpoint: string): Promise<HttpResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, { method: "GET" });

    if (!res.ok) return { error: `Error: ${res.status} - ${res.statusText}` };

    const data = (await res.json()) as T;
    return { success: data };
  } catch (e) {
    return { error: `Error: ${String(e)}` };
  }
}

// POST genérico
export async function postRequest<T>(
  endpoint: string,
  body: any        
): Promise<HttpResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (![200, 201, 204].includes(res.status)) {
      return { error: `Error: ${res.status} - ${res.statusText}` };
    }

    const data = res.status !== 204 ? ((await res.json()) as T) : undefined;
    return { success: data };
  } catch (e) {
    return { error: `Error: ${String(e)}` };
  }
}
