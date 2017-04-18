Bash
====
<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>

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

Grep
----
`grep` to search for text in files using [regex][].

`grep needle haystack.md` searches for the text 'needle' in haystack.md.

Leave out the file to read from stdin: `ls -l large_dir/ | grep is_it_there`

- `-i` for case-insensitive search
- `-w` to match whole words (`hard` matches 'hard water' but not 'hardly')
- `-F` for literal matching instead of regex
- `-r` for recursive search: `grep -r caboose .` searches for 'caboose' in all
  files nested in the current directory


[regex]: http://man7.org/linux/man-pages/man1/grep.1.html#REGULAR_EXPRESSIONS
