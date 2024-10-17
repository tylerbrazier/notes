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
