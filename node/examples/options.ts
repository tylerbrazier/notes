/* The node stdlib often uses this pattern of using
 * required args as positional and grouping
 * optional args (with defaults) in an object as the last param.
 * https://nodejs.org/docs/latest/api/
 */
function withOptions(
	required: string,
	options: {
		num?: number,
		bool?: boolean,
	} = {}
) {
	// set the defaults for optional args
	const {
		num = 7,
		bool = true,
	} = options

	console.log(required, `{ num=${num}, bool=${bool} }`)
}

withOptions('no options defined:')
withOptions('just num defined:', { num: 12 })
withOptions('just bool defined:', { bool: false })
withOptions('all options defined:', { num: 12, bool: false })
