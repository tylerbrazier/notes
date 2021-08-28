# Bash notes
A good place for learning/reference: <https://mywiki.wooledge.org/>

Pure sh bible: <https://github.com/dylanaraps/pure-sh-bible>

Pure bash bible: <https://github.com/dylanaraps/pure-bash-bible>

Shellcheck (lint): <https://www.shellcheck.net/>

## Builtin Commands
`read -s -p 'Password: ' var` will prompt for password, storing it in `var`.
`-s` (silent) will hide input. `-n 1` would read only one typed character.

## Parameter expansion
<https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html>

`%` deletes from the end, `#` deletes from the beginning:

	s='abc,def'
	${s%,*} -> abc
	${s#*,} -> def


two `%%/##` strips the longest matching pattern:

	s='abc,def,hij'
	${s%%,*} -> abc
	${s##*,} -> hij

`:-` to use a default value:

	port="${1:-80}"         # prefer positional param 1 but default to 80
	EDITOR="${EDITOR:-vi}"  # default editor to vi

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

## Prompts/Reading input

	ask() {
		local readopts="$1"
		local default="$2"
		local answer=
		while [ -z "$answer" ]; do
			eval "read $readopts answer"
			answer="${answer:-$default}"
		done
		echo "$answer"
	}

	result=$(ask "-n 1 -p 'Will you follow me? [Y/n] '" "y")
