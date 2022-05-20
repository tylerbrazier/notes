Usage: `rename [opts] expression replacement file...`

	-a all occurrences of expression, not just the first
	-l last occurrence instead of first
	-v show which files were renamed if any
	-n dry run
	-i interactive
	-o no overwrite

To remove leading `Artist Name - ` from all files in this dir:

	rename 'Artist Name - ' '' *

To replace spaces with underscores:

	rename -a ' ' _ *
