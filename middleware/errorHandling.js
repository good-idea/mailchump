exports.notFound = (req, res) => {
	res.status(404).send('Not found')
}

exports.general = (err, req, res, next) => {
	// console.log(err)
	res.status(err.status || 500)
	// if (process.env.NODE_ENV === 'development' || process.env.LOG_ERRORS === 'true') console.log(err.message)
	res.send(err.message || 'An unexpected error occured')
}
