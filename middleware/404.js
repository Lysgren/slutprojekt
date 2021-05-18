const fourZeroFour = (req, res) => {
  res.status(404).json({ message: '404: Endpoint not Found' })
}

module.exports = fourZeroFour