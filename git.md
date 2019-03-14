When resolving conflicts after pulling, sometimes it's useful to see what
happened on the branch since the last time you pulled:

    git diff ...FETCH_HEAD
    # (short for git diff HEAD...FETCH_HEAD)

or as separate commits (note the two `..` instead of three):

    git log -p ..FETCH_HEAD
    # (short for git log -p HEAD..FETCH_HEAD)
    # (same as git log -p FETCH_HEAD --not HEAD)

These commands work in the midst of a merge conflict but not a rebase conflict.
You'll need to `git rebase --abort`, run the commands, then rebase again.
