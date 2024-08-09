#!/usr/local/bin/node
const request = require('request');
const API_URL = 'https://swapi-api.alx-tools.com/api';

if (process.argv.length > 2) {
  const filmId = process.argv[2];
  request(`${API_URL}/films/${filmId}/`, (err, response, body) => {
    if (err) {
      console.error('Error:', err);
      return;
    }

    if (response.statusCode !== 200) {
      console.error(`Failed to fetch data. Status code: ${response.statusCode}`);
      return;
    }

    try {
      const filmData = JSON.parse(body);
      const charactersURL = filmData.characters;
      const charactersName = charactersURL.map(
        url => new Promise((resolve, reject) => {
          request(url, (promiseErr, _, charactersReqBody) => {
            if (promiseErr) {
              reject(promiseErr);
            }
            resolve(JSON.parse(charactersReqBody).name);
          });
        })
      );

      Promise.all(charactersName)
        .then(names => console.log(names.join('\n')))
        .catch(allErr => console.error(allErr));
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError.message);
    }
  });
}
