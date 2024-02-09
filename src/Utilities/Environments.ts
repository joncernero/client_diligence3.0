let APIURL = 'https://diligence-server.onrender.com/api/v1';

switch (window.location.hostname) {
  case 'https://diligence-server.onrender.com':
    APIURL = 'https://diligence-server.onrender.com/api/v1';
    break;
  // case 'localhost' || '127.0.0.1':
  //   APIURL = 'http://localhost:3005/api/v1';
  //   break;
}

export default APIURL;
