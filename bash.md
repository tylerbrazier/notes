# Bash

<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>

## Shortcuts

### Keyboard shortcuts
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

### Command shortcuts
- `!!` is a shortcut for the previous command (e.g. `sudo !!` is common)
- `!$` is a shortcut for the last argument of the previous command
- `~` is a shortcut for your home directory (e.g. `/home/tyler`)
- `.` is a shortcut for the current working directory (cwd)
- `..` is a shortcut for the parent of the cwd


## Basic Commands

### Navigating the file system
- `pwd` prints the current working directory (cwd)
- `ls [directory]` to list files in a directory; defaults to cwd
  - `-l` (e.g. `ls -l`) for long format; gives more info about each file
  - `-a` to show all files, including hidden files (which start with a `.`)
  - `ls -l -a` or `ls -la` to do both
- `cd [directory]` change working directory; defaults to your home directory
  - `cd -` change back to previous cwd

## Grep
`grep` to search for text in files using [regex][].

`grep needle haystack.md` searches for the text 'needle' in haystack.md.

Leave out the file to read from stdin: `ls -l large_dir/ | grep is_it_there`

- `-i` for case-insensitive search
- `-w` to match whole words (`hard` matches 'hard water' but not 'hardly')
- `-F` for literal matching instead of regex
- `-r` for recursive search: `grep -r caboose .` searches for 'caboose' in all
  files nested in the current directory


[regex]: http://man7.org/linux/man-pages/man1/grep.1.html#REGULAR_EXPRESSIONS
