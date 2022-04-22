
function addResponseHeader(req, res, next) {
  res.header("x-xss-protection", "1; mode=block");
  res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.header("Content-Security-Policy", "frame-ancestors 'none';");
  res.header("x-frame-options", "SAMEORIGIN");
  res.header("X-Content-Type-Options", "nosniff");
  next();
}

module.exports = addResponseHeader