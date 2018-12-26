# Bash
**TODO** migrate stuff from linux.md to this file and use this instead.

[Bash][] is the default shell on most unix-like systems.

## Prompt
To include git info in the prompt, add something like the following to
`~/.bashrc` (the location and name of `git-prompt.sh` may differ per OS):

    source /usr/share/git/git-prompt.sh
    GIT_PS1_SHOWDIRTYSTATE=1
    GIT_PS1_SHOWUNTRACKEDFILES=1
    GIT_PS1_SHOWCOLORHINTS=1
    PROMPT_COMMAND='__git_ps1 "\w" " \\\$ "'

For more info read the `git-prompt.sh` script and <https://git-scm.com/book/en/v2/Appendix-A%3A-Git-in-Other-Environments-Git-in-Bash>.
Also see the `PROMPTING` section in the bash manual.

## Aliases
These are useful to add to `~/.bashrc`:

    alias ls='ls --color=auto'
    alias ll='ls -l -h'
    alias la='ls -a -l -h'

    alias cp='cp -r'
    alias rm='rm -r'
    alias mkdir='mkdir -p'

Aliases can't take arguments so a function is needed for this -
auto `ls` after `cd`:

    cd() { builtin cd "$@" && ls; }

## Completion
Press `Tab` to auto-complete commands and file names.
Add this to your `~/.bashrc` to make completion case-insensitive:

    bind 'set completion-ignore-case on'

## History
Add this to `~/.bashrc` to ignore duplicate sequential entries in history:

    HISTCONTROL=ignoredups
[Bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell)
