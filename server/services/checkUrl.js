const https = require('https');

const isUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
}

const isUrlSecure = (url) => {
  if(url.startsWith('https')) {
    return true;
  } else {
    return false;
  }
}

const isUrlWorking = (url) => {
  return new Promise((resolve, reject) => {
    https.request(url, { method: 'HEAD' }, (response) => {
      console.log(response.statusCode);
      if(response.statusCode >= 200 &&
        response.statusCode < 400) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    .on('error', (err) => {
      resolve(false);
    })
    .end();
  });
}

const checkUrl = async (str) => {
  if(!isUrl(str)) {
    return "Please enter a valid url!";
  }

  if(!isUrlSecure(str)) {
    return `Sorry cannot create a shortcut, ${str} is not secure!`;
  }

  const isWorking = await isUrlWorking(str)
  .then(isWorking => {
    return isWorking;
  })
  .catch(err => console.error(err));
  if(!isWorking) {
    return `The URL ${str} is not working!`;
  }
}

module.exports = checkUrl