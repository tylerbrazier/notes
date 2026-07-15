/* The node stdlib often uses this pattern of using
 * required args as positional and grouping
 * optional args (with defaults) in an object as the last param.
 * https://nodejs.org/docs/latest/api/
 */

// simple case: each option has a default of its only possible type
function withOptions(
	required: string,
	{ num = 7, bool = true } = {}, // options
) {
	console.log("withOptions:", required, `{ num=${num}, bool=${bool} }`);
}

withOptions("no options defined:");
withOptions("just num defined:", { num: 12 });
withOptions("just bool defined:", { bool: false });
withOptions("all options defined:", { num: 12, bool: false });

// not as simple case: options have a type but may be undefined
// or there are options with several possible types
function withComplexOptions(
	required: string,
	{
		str = undefined,
		numOrBool = 40,
	}: {
		str?: string;
		numOrBool?: number | boolean;
	} = {},
) {
	console.log(
		"withComplexOptions:",
		required,
		`{ str=${str}, numOrBool=${numOrBool} }`,
	);
}

withComplexOptions("no options defined:");
withComplexOptions("just str defined:", { str: "text" });
withComplexOptions("numOrBool as num:", { numOrBool: 70 });
withComplexOptions("numOrBool as bool:", { numOrBool: true });
