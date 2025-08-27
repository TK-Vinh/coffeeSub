import { Toast } from 'toastify-react-native';

export async function fetchWithErrorHandling(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const res = await fetch(input, init);

  if ([400, 401, 403].includes(res.status)) {
    let message = 'An error occurred';
    try {
      const data = await res.json();
      if (data?.message) {
        message = data.message;
      }
    } catch (error) {
      // ignore json parse errors
    }
    Toast.error(message);
    throw new Error(message);
  }

  return res;
}
