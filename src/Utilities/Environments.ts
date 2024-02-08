let APIURL = '';

switch (window.location.hostname) {
  // case 'localhost' || '127.0.0.1':
  //   APIURL = 'http://localhost:3005/api/v1';
  //   break;
  case 'https://diligence-server.onrender.com':
    APIURL = 'https://diligence-server.onrender.com';
    break;
}

export default APIURL;
