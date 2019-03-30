import app from '../server-app';
app.set('port', process.env.PORT || 2083)

let server = app.listen(app.get('port'), async function () {
  console.log('Express server listening on port ' + server.address().port)
})
