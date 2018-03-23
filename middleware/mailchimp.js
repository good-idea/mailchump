const axios = require('axios')
const md5 = require('md5')

const { lists, credentials, defaultList } = require('../config')

if (!defaultList) throw new Error('`defaultList` must be defined in config')

exports.subscribe = (req, res, next) => {
	const { email } = req.body
	const listName = req.body.list || req.params.list
	const list = listName ? lists.get(listName) : defaultList
	if (!list) {
		res.status(404)
		return next(new Error(`No list with name '${listName}' was found`))
	}
	const auth = list.credentials || credentials
	console.log(email)
	const apiRoot = `https://${list.datacenter}.api.mailchimp.com/3.0`
	const hash = md5(email)
	axios
		.put(
			`${apiRoot}/lists/${list.listId}/members/${hash}`,
			{
				email_address: email,
				status_if_new: 'subscribed',
			},
			{
				auth,
			},
		)
		.then((mcResponse) => {
			res.status = mcResponse.status
			if (res.status !== 200) return next(mcResponse)
			const { data } = mcResponse || {}
			return res.json({ data })
		})
		.catch((err) => {
			console.log(err.response.data)
			// TODO: return required field validation errors. Looks like:
			// {
			// 	type: 'http://developer.mailchimp.com/documentation/mailchimp/guides/error-glossary/',
			// 	title: 'Invalid Resource',
			// 	status: 400,
			// 	detail: 'Your merge fields were invalid.',
			// 	instance: '085648d4-7674-4288-b35d-46fc05721fb8',
			// 	errors: [{ field: 'FULL_NAME', message: 'Please enter a value' }],
			// }
			next({
				status: err.response.status,
				message: err.response.data.detail || err.response.statusText,
			})
		})
}
