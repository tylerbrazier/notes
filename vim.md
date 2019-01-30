# Vim
Vim is a text editor.
There's no need to get into [editor wars][]; find an editor you like and learn it to be productive.
I like vim because of the following:

- Edit text very fast once you learn it
- Doesn't need a GUI; can be used on servers and small computers (raspberry pi)
- It's available on all major operating systems
- Remember one set of keybindings; IDEs come and go but vi will never die
- It's customizable and scriptable; all the features of any IDE via plugins
- It's free and open source

My college advisor said we must learn either emacs or vim to work with him on an intern project.
I tried both and vim is still my all time favorite editor.

## Learning
- `vimtutor` command
- <https://robots.thoughtbot.com/the-vim-learning-curve-is-a-myth>
- <http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html>

## Notes
- combo `d`, `c`, `y`, etc. with text objects (`:h text-objects`) e.g.:
  - `daw` (delete around word) to delete a word the cursor is on
  - `ci)` (change inner `)`) is really useful to change function parameters
  - the above can even be used when the cursor is before the parens on that line
- `gd` and `*` to find definitions and usages of variables
- `ctrl-o`/`ctrl-i` to jump back (out) and forward (in) from previous positions
- `ctrl-z` to suspend vim; useful to git commit, etc. (then `fg` to foreground)

### Spell checking
- `:set spell!` to toggle
- `]s` and `[s` jump to next and previous misspelled word
- `z=` on a misspelled word for correction suggestions

### Folding
- `zc` close one level of fold under cursor
- `zC` close all folds under cursor recursively
- `zM` close all folds
- `zo` open one level of fold under cursor
- `zO` open all folds under cursor recursively
- `zR` open all folds

### Window management
- `ctrl-w s` (or `:split`) split horizontally
- `ctrl-w v` (or `:vsplit`) split vertically
- `ctrl-w o` (or `:only`) close all other windows
- `ctrl-w T` move the current window to a new tab
- `ctrl-w h/j/k/l` move to window left/down/up/right
- `ctrl-w H/J/K/L` move window to the left/down/up/right

### Plugins
Vim 8 added packages so a plugin manager isn't needed (`:help packages`).
Just clone plugin repos into `~/.vim/pack/*/start/` like:

    git clone https://github.com/tpope/vim-sensible ~/.vim/pack/x/start/vim-sensible

Generating helptags for all plugins (`:helptags ALL`) may require running vim
as root since it might generate tags in system directories.
