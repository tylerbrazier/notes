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
