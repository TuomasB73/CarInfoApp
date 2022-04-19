export default (app, port, graphQlPath) => {
  app.enable('trust proxy');

  app.use((req, res, next) => {
    if (req.secure) {
      // request was via https, so don't do any special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  app.listen(port, () => {
    console.log(`🚗 Server ready at http://localhost:${port}${graphQlPath}`);
  });
};
