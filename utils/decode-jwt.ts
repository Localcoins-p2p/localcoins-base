export function decodeJwt(token: string) {
  const [header, payload, signature] = token.split('.');
  if (!payload) {
    return {};
  }
  const decodedPayload = JSON.parse(
    atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  );
  return decodedPayload;
}
