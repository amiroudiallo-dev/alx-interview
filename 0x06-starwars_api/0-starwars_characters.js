#!/usr/bin/node
const request = require('request');
const API_URL = 'https://swapi-api.alx-tools.com/api/films/';

if (process.argv.length > 2) {
  const filmId = process.argv[2];
  request(`${API_URL}${filmId}/`, (err, response, body) => {
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
      const characterURLs = filmData.characters;
      const characterPromises = characterURLs.map(url =>
        new Promise((resolve, reject) => {
          request(url, (err, _, characterBody) => {
            if (err) {
              reject(err);
              return;
            }
            try {
              const characterData = JSON.parse(characterBody);
              resolve(characterData.name);
            } catch (parseErr) {
              reject(parseErr);
            }
          });
        })
      );

      Promise.all(characterPromises)
        .then(names => console.log(names.join('\n')))
        .catch(err => console.error('Error fetching character names:', err));
    } catch (parseErr) {
      console.error('Failed to parse film data:', parseErr.message);
    }
  });
}
