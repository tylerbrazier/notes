# Vim

## Why
- Edit text very fast once you learn it
- Doesn't need a GUI; can be used on servers and small computers (raspberry pi)
- It's available on all major operating systems
- Remember one set of keybindings; IDEs come and go but vi will never die
- It's customizable and scriptable; all the features of any IDE via plugins
- It's free and open source

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

### Spell checking
- `:set spell!` to toggle
- `]s` and `[s` jump to next and previous misspelled word
- `z=` on a misspelled word for correction suggestions

### Window management
- `<c-w> s` split horizontally (:split)
- `<c-w> v` split vertically (:vsplit)
- `<c-w> o` close all other windows (:only)
- `<c-w> h/j/k/l` move to window left/down/up/right
- `<c-w> H/J/K/L` move window to the left/down/up/right
