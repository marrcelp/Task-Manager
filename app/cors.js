// cors.js
module.exports = (req, res, next) => {
  next(); // nic nie zmieniamy, nie dodajemy CORS, bo robi to nginx
};
