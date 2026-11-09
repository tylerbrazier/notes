/* The node stdlib often uses this pattern of using
 * required args as positional and grouping
 * optional args (with defaults) in an object as the last param.
 * https://nodejs.org/docs/latest/api/
 */

function fnWithOpts(
	required: string,
	{
		str = "default",
		numOrBool = 7 as number | boolean,
		canBeUndefined = undefined as string[] | undefined,
	} = {},
) {
	console.log(
		required,
		JSON.stringify({ str, numOrBool, canBeUndefined }, null, 2),
	);
}

fnWithOpts("no options defined:");
fnWithOpts("just str defined:", { str: "specified" });
fnWithOpts("define the canBeUndefined", { canBeUndefined: ["specified"] });
