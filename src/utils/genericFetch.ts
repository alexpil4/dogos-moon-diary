export async function genericFunc() {
  const response = await fetch('https://retoolapi.dev/qj0wA4/user');
  if (!response.ok) throw Error('Error');

  const data = (await response.json()) as [{ [key: string]: string }];

  return data;
}
