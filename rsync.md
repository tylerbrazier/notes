Trailing slash in src/ will sync the files *in* src rather than the dir itself.

	# -v verbose
	# -h human readable numbers
	# -u skip files that are newer on the receiver
	# -r recursive
	# -l copy symlinks as symlinks
	# -p preserve permissions
	# -t preserve modification times
	# -g preserve group
	# -o preserve owner
	# -D preserve device files and special files
	# -a archive mode is -rlptgoD
	# -E preserve executability
	# -e specify remote shell (e.g. different ssh port: -e 'ssh -p 8022')
	# -n dry run
	# --exclude '.*' exclude hidden files/dirs
