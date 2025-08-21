export async function getUserName(): Promise<string | null> {
	const response = await fetch('/.auth/me');
	const payload = await response.json();
	const { clientPrincipal } = payload;
	if (clientPrincipal && clientPrincipal.userDetails) {
		return(clientPrincipal.userDetails);
	}
  return null;
}
