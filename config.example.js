// This file can contain sensitive information.
// After adding keys and list data, rename this to `mailchimplists.js`. Be sure to not commit the new file!

/**
 *  *  *  AUTH  *  *  *
 * These credentials will be used by default.
 * See below for how to define list-specific credentials.
 */

const credentials = {
	user: 'my-username',
	password: 'my-api-key',
}

/**
 *  *  *  Lists  *  *  *
 * "name" is used on the client side to find a list in this list. Example:
 * axios.post('https://subscribe.example.com/subscribe/my-list')
 */

const lists = new Map()

lists.set('my-list', {
	listId: 'abc123',
	datacenter: 'us6',
})

lists.set('their-list', {
	listId: 'xyz789',
	datacenter: 'us8',
	credentials: {
		user: 'their-username',
		password: 'their-api-key',
	},
})

module.exports = {
	lists,
	// defaultList is used when no list slug is provided in the POST params
	defaultList: lists.get('my-list'),
	credentials,
}
