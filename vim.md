# Vim

## Why?
- Edit text very fast once you learn it.
- Doesn't need a GUI; can be used on headless servers.
- It's available on all major operating systems.
- Remember one set of keybindings; IDEs come and go but vi is eternal.
- It's customizable and scriptable; all the features of any IDE via plugins
- It's free and open source.

The biggest thing that keeps people from using vim is the learning curve.
Vim is no different than anything else that's rewarding, it requires some
upfront effort; but the payoff is worth it. Probably the best way to start is
the `vimtutor` command. There's also [a game](https://vim-adventures.com/).

## Primer
Vim starts in *normal* mode; your keystrokes enter commands, not text.
To enter text, you need to be in *insert* mode.

- `i` to enter insert mode
- `<esc>` to leave insert mode
- `:w` (or `:write`) to save changes
- `:q` (or `:quit`) to exit
- `:wq` write and quit
- `:q!` quit without warning about unsaved changes
- `:h` (or `:help`) optionally followed by a subject to open the help window
  (e.g. `:h :w` to read about the write command). `:q` to close the window

## Movement
One of the things that makes editing text in vim fast is that your hands don't
leave the keyboard; no arrow keys, no mouse.

- `j` moves the cursor down (it helps to remember that it like a hook)
- `k` moves up
- `h` moves left
- `l` moves right

*word*s include letters, numbers, and underscores.  
*WORD*s include anything besides whitespace.

- `w` move to beginning of next word. `W` for WORD
- `e` move to end of word. `E` for WORD
- `b` move back one word. `B` for WORD
- `f` (find) followed by a character to move to that character on the line.
  `F` to find in reverse
- `t` ('til) followed by a character to move right before (until) that character on the line.
  `T` to 'til in reverse
- `;` repeat last `f`, `F`, `t`, or `T`.
  `,` to repeat in reverse

## Jump around
- `gg` jump to top of file
- `G` jump to bottom of file or precede with a number to jump to that line number
- `H` jump cursor to top of view
- `L` jump cursor to bottom of view
- `M` jump cursor to middle of view
- `ctrl-o` (jump out) unjump once
- `ctrl-i` (jump in) rejump once

## Search
- `/` followed by pattern to search for pattern.
  `?` to search in reverse
- `*` search for word under cursor (very useful to find usages of variables).
  `#` to search in reverse
- `gd` (goto definition) jump to definition of variable under cursor
- `n` jump to next search match.
  `N` to jump to previous match

## Spell checking
- `:set spell` to enable
- `:set nospell` to disable
- `:set invspell` to invert (toggle)
- `]s` jump to next misspelled word
- `[s` jump to previous misspelled word
- `z=` on a misspelled word for correction suggestions

## Line numbers
- `:set nu[mber]` to show line numbers
- `:set nonu` to turn off
- `:set invnu` to invert (toggle)


## Plugins
[vim-plug][] to manage plugins.

### Gitgutter
[gitgutter][] for viewing and working with groups of git changes (aka hunks).

- `]c` jump to next change
- `[c` jump to previous change
- `<leader>hp` (hunk preview) see the diff at the current change hunk
- `<leader>hu` (hunk undo) undo a change hunk
- `<leader>hs` (hunk stage) add the current change hunk to the index

(`<leader>` is mapped from `\` by default; `:help mapleader`)

The plugin also provides `ic` and `ac` text objects so you can do combos like
`dac` to 'delete a change'.

### CtrlP
[ctrlp][] is a fuzzy file finder.

- `<c-p>` to open finder
- `<c-k>`/`<c-j>` move up/down
- `<c-n>`/`<c-p>` cycle next/previous in search history
- `<c-f>`/`<c-b>` cycle forward/backward between modes (files, buffers, MRU)
- `<c-t>` open selected file in new tab
- `<c-s>` open selected file in horizontal split
- `<c-v>` open selected file in vertical split
- `<c-z>` mark multiple files, then `<c-t>`/`<c-s>`/`<c-v>` to open them
- `<c-r>` toggle regex searching instead of fuzzy; useful to force your search
  characters to be consecutive


[vim-plug]: https://github.com/junegunn/vim-plug
[gitgutter]: https://github.com/airblade/vim-gitgutter
[ctrlp]: https://github.com/ctrlpvim/ctrlp.vim
