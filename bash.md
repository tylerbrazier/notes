# Bash
**TODO** migrate stuff from linux.md to this file and use this instead.

[Bash][] is the default (and probably the most popular) unix shell.

## prompt
To include git info in the prompt, add something like the following to
`~/.bashrc` (the location or name of `git-prompt.sh` may differ per OS):

    source /usr/share/git/git-prompt.sh
    GIT_PS1_SHOWDIRTYSTATE=1
    GIT_PS1_SHOWUNTRACKEDFILES=1
    GIT_PS1_SHOWCOLORHINTS=1
    PROMPT_COMMAND='__git_ps1 "\w" " \\\$ "'

For more info read the `git-prompt.sh` script and <https://git-scm.com/book/en/v2/Appendix-A%3A-Git-in-Other-Environments-Git-in-Bash>

[Bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell)
