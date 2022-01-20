export function signIn(info) {
  return fetch('http://192.168.0.2:8080/api/login', {
    method: 'POST',
    bodt: JSON.stringify(info),
  })
    .then(res => res.text())
    .then(res => console.log(res));
}
