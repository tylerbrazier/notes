# GNU/Linux

## Command line interface (cli)

[Bash][] is the default shell (and probably the most widely-used) on most linux
distributions. You give commands to your shell and it does stuff for you.

### Commands
Most commands take options (which start with a `-`) and arguments, which are
all separated by spaces; e.g. `ls -l /home/tyler`. By convention, required
arguments are usually shown with angle brackets (`<arg>`) and optional args
with square brackets (`[arg]`).

Commands usually have a `-h` or `--help` option for more info.

#### File system
- `pwd` prints the current working directory (cwd)
- `ls [directory]` to list files in a directory; defaults to cwd
  * `ls -l` for long format; gives more info about each file
  * `ls -a` to show all files, including hidden files (which start with a `.`)
- `cd [directory]` change working directory; defaults to your home directory
  * `cd -` change back to previous cwd
- `touch <file>` to create a new file
- `mkdir <dir>` to make a directory
  * `-p` to also make parent dirs as needed; e.g. `mkdir -p notes/examples`
- `ln -s <source> <link>` make a symbolic link (symlink) to `<source>`
- `cp <source> <dest>` copy a `<source>` file to `<dest>`
  * `-r` (recursive) to copy whole directories
- `mv <source> <dest>` move (rename) a file or directory
- `rm <file>` remove files
  * `-r` (recursive) to remove whole directories
  * `-f` (force) just do it, don't prompt for anything

`.` refers to the cwd and `..` refers to the parent of the cwd;
e.g. `cd ../..` will move you two directories up. `~` refers to your home
directory; e.g. `ls -a ~/dir` lists all files in `/home/tyler/dir`.

#### Standard input/output (stdin/stdout)
stdin (file descriptor 0) is read from your keyboard. stdout (descriptor 1)
and stderr (descriptor 2) are printed on your terminal screen.

- `echo 'whatever'` to print `whatever` to stdout
- `cat [file]` to print the contents of `file` to stdout
  * if no `file` or file is `-`, `cat` reads from stdin (use ctrl-d to finish)
- `head [-n <n>] [file]` like `cat` but prints only top `<n>` lines (default 10)
- `tail [-n <n>] [file]` like `head` but prints last `<n>` lines (default 10)
- `more` is a pager; it's used for viewing long files or output
  * `more <file>` prints `file` to stdout if it will fit on screen;
    otherwise, the file is loaded into the pager
  * `Enter` to scroll one line, `Space` to scroll length of screen
  * `h` for more help
  * `q` to quit
- `less` is a newer and better pager that allows scrolling up (less is more)
- `|` (pipe) to use the stdout of one command as the stdin of another;
  e.g. `cat file | less` is common for viewing large files
- `>` to redirect output to a file; e.g. `echo a 1> file` writes `a` to `file`
  * `>>` is like `>` but it appends to the file instead of overwriting it
  * e.g. to discard a command's output and log its error messages to a file:
    `some_command 1> /dev/null 2> err.log`
  * redirect is from stdout by default so `>` is equivalent to `1>`
  * can also redirect stderr to stdout and vice versa: e.g.
    `some_command >file 2>&1` will send command's stdout and stderr to `file`


#### Grep
`grep` to search for text in files using [regex][].

`grep needle haystack.md` searches for the text 'needle' in haystack.md.

Leave out the file to read from stdin: `ls -l large_dir/ | grep is_it_there`

- `-i` for case-insensitive search
- `-w` to match whole words (`hard` matches 'hard water' but not 'hardly')
- `-F` for literal matching instead of regex
- `-r` for recursive search: `grep -r caboose .` searches for 'caboose' in all
files nested in the current directory


### Shortcuts

#### Keyboard shortcuts
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

#### Command shortcuts
- `!!` is a shortcut for the previous command (e.g. `sudo !!` is common)
- `!$` is a shortcut for the last argument of the previous command
- Many commands let you combine options: e.g. `ls -la` is the same as `ls -l -a`


[Bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell)
[regex]: http://man7.org/linux/man-pages/man1/grep.1.html#REGULAR_EXPRESSIONS
