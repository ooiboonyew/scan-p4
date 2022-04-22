function adeErrorHandler(err, req, res, next) {
  console.log('# Error Handler');
  console.log(err);
  // add more here to process particular errors
  
  console.log('# Generic Error Type')
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
}

module.exports = adeErrorHandler;