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

## In and out
Vim starts in *normal* mode; your keystrokes enter commands, not text.
To enter text, you need to be in *insert* mode.

- `i` to enter insert mode
- `<esc>` to leave insert mode
- `:w` (or `:write`) to save changes
- `:q` (or `:quit`) to exit
- `:wq` write and quit
- `:q!` quit without warning about unsaved changes

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

## Spell checking
- `:set spell` to enable
- `:set nospell` to disable
- `:set invspell` to invert (toggle)
- `]s` jump to next misspelled word
- `[s` jump to previous misspelled word
- `z=` on a misspelled word for correction suggestions


## Search
- `/` to forward search for pattern, `?` for backwards search
- `*` to forward search for word under cursor, `#` to backwards search
  (very useful for finding usages of variables in code)
- `gd` (goto definition) to search and jump to first occurrence of word under
  cursor
- `n` to jump to next search match, `N` for previous
- `ctrl-o` (jump out) to go back one jump, `ctrl-i` (jump in) to go forward


## Line numbers
- `:set nu` to show line numbers (`nonu` to turn off, `invnu` to toggle).
- The default statusline shows the current line (and column) number;
  `set laststatus=2` to always show the statusline.
- `55G` to jump to line 55.


## Plugins
[vim-plug](https://github.com/junegunn/vim-plug) is a great plugin manager.

### Gitgutter
[gitgutter](https://github.com/airblade/vim-gitgutter) shows line changes.

- `]c` jump to next change
- `[c` jump to previous change
- `<leader>hp` (hunk preview) see the diff at the current change hunk
- `<leader>hu` (hunk undo) undo a change hunk
- `<leader>hs` (hunk stage) add the current change hunk to the index

(`<leader>` is mapped from `\` by default; `:help mapleader`)

### Fugitive
[fugitive](https://github.com/tpope/vim-fugitive) adds a bunch of useful git
stuff to vim. I have mappings for the common stuff I use in [vimrc][].
Use `g?` in a fugitive window (`Gstatus`, `Gblame`, etc.) to see what mappings
you have available in that window. `o` and `O` are very handy for opening
files, commits, etc. in a new split or tab; you can even use it on the `@@`
lines when viewing a commit (with `:Glog --`) to vimdiff that commit in a new
tab.

- `:Gmerge` to resolve conflicts (even after a `git merge/pull/rebase`),
  then `:cn/:cp` for next/previous conflict
- in `Gstatus` window, `-` to stage or unstage files
- in `Gblame` window, `P` to see more history (parent commits) for a line

### CtrlP
[CtrlP](https://github.com/ctrlpvim/ctrlp.vim) is a fuzzy file finder.

- `<c-p>` to open finder
- `<c-k>`/`<c-j>` move up/down
- `<c-n>`/`<c-p>` cycle next/previous in search history
- `<c-f>`/`<c-b>` cycle forward/backward between modes (files, buffers, MRU)
- `<c-t>` open selected file in new tab
- `<c-t>` open selected file in new tab
- `<c-s>` open selected file in horizontal split
- `<c-v>` open selected file in vertical split
- `<c-z>` mark multiple files, then `<c-t>`/`<c-s>`/`<c-v>` to open them
- `<c-r>` toggle regex searching instead of fuzzy; useful to force your search
  chars to be consecutive in matches


[vimrc]: https://github.com/tylerbrazier/dotfiles/blob/master/vimrc
