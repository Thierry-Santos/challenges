const logger = async (request, response, next) => {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next();
};

module.exports = logger;
