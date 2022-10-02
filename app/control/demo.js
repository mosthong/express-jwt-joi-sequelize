
exports.Home = (req, res) => {
  const body = req.body
  const { username, password } = body

  res.render('index.html', { title: 'Home', message: 'Home content' })
}