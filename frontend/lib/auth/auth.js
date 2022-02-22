export function signIn({email, password}) {
  return fetch(
    `http://192.168.0.2:8080/api/login?email=${email}&password=${password}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    },
  )
    .then(res => res.text())
    .then(res => console.log(res));
}
