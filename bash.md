[Bash][0]
=========

Shortcuts
---------
Bash has emacs-style keybindings by default (`set -o vi` for vi-like bindings).

- `<c-a>`/`<c-e>` to jump to beginning/end of line
- `<c-n>`/`<c-p>` to go to next/previous line
- `<c-w>` to delete previous word
- `<c-u>` to delete the whole line
- `<c-r>` to reverse-search command history
- `<c-l>` to clear the screen
- `<c-c>` to cancel (actually SIGINT) the current process
- `<c-d>` to exit
- `<tab>` to auto-complete commands, paths, etc.
- `!!` is a shortcut for the previous command
- `!$` is a shortcut for the last argument of the previous command


Basic Commands
--------------
- `man <command>` to read the manual page for any command
- `pwd` print working (current) directory
- `ls [directory]` to list files in a directory; defaults to current directory
- `cd [directory]` change working directory; defaults to home
- `cd -` change back to previous directory
- `cat <file>` print out the contents of a file


[0]: https://en.wikipedia.org/wiki/Bash_(Unix_shell)
