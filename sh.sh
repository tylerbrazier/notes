#!/bin/sh

# https://github.com/dylanaraps/pure-sh-bible
# Examples from Alpine linux at: https://git.alpinelinux.org/alpine-conf

GLOBAL_VARS="make them upper case at the top of the script"
# Variables are easier to track when they're all declared in one place
# and prevents accidental reusing.

fn() {
	local_vars="make them lower case at the top of functions"
	# Variables are easier to track when they're all declared in one place
	# and prevents accidental reusing from other functions when defined at
	# the top (the `local` keyword is not part of POSIX, but not needed if
	# you follow this pattern).
}

parameter_expansion() {
	var="one/two/three"

	echo "Parameter Expansion:"
	echo "# removes pattern from BEGINNING of string"
	echo "% removes pattern from END of string"

	printf '\nvar=%s\n\n' "$var"

	echo '${var#*/} ->' "${var#*/}"    # two/three
	echo '${var##*/} ->' "${var##*/}"  # three

	echo '${var%/*} ->' "${var%/*}"    # one/two
	echo '${var%%/*} ->' "${var%%/*}"  # one
}
parameter_expansion

arrays() {
	simple_array='
	each
	cannot
	have
	spaces
	'
	# don't quote around $simple_array
	for i in $simple_array; do
		echo "simple_array entry: $i"
	done

	allows_comments=$(echo '
	only
	show
	#commented
	uncommented
	lines #trim this too
	' | sed 's/#.*//')
	for i in $allows_comments; do
		echo "allows_comments entry: $i"
	done
}
arrays
