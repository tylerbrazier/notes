## Parameter expansion
<https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html>

`%` deletes from the end, `#` deletes from the beginning:

	s='abc,def'
	${s%,*} -> abc
	${s#,*} -> def


two `%%/##` strips the longest matching pattern:

	s='abc,def,hij'
	${s%%,*} -> abc
	${s##*,} -> hij

`:-` to use a default value:

	editor="${1:-vi}" # prefer param 1 but default to vi

## Option/argument parsing

	usage="Usage: $0 [-h|--help] [-b|--bool] [-a|--with-arg <arg>] <params>..."
	params=()

	fail() {
		echo "$1" 1>&2
		echo "$usage" 1>&2
		exit 1
	}

	while [ $# -gt 0 ]; do
		case "$1" in
		-h|--help)
			echo "$usage"
			exit 0
			;;
		-b|--bool)
			b=1
			shift
			;;
		-a|--with-arg)
			# fail if arg is empty or starts with "-"
			[ -z "$2" -o "${2:0:1}" == "-" ] && fail "-a requires an argument"
			a="$2"
			shift 2
			;;
		[^-]*)
			# positional parameters (not beginning with a "-")
			params+=("$1")
			shift
			;;
		*)
			fail "Unsupported option $1"
			;;
		esac
	done

	[ -z "$params" ] && fail "At least one positional param is required"

	echo "a: $a"
	echo "b: $b"
	echo "params: ${params[@]}"
