//https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator

type O = Record<string, string | number>

const unsatisfied: O = {
	couldBeStringOrNumber: "but it's definitely a string"
}

// This will error b/c the type is "wide"; TS thinks it could be a number:
unsatisfied.couldBeStringOrNumber.toLowerCase()

const satisfied = {
	couldBeStringOrNumber: "but it's definitely a string"
} satisfies O

// This works because `satisfies` will check the type more narrowly:
satisfied.couldBeStringOrNumber.toLowerCase()
