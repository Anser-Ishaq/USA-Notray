export function isTokenExpired(token) {
    if (!token) return true;
  
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(window.atob(payloadBase64));
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  console.log('token deadline: ' + decodedPayload.exp)
  console.log('payload deadline: ' + currentTime)
    return decodedPayload.exp < currentTime;
  }
  