Vim
===
## Why use it?
- Edit text very fast once you learn it.
- Doesn't need a GUI; can be used on headless servers.
- It's available on all major operating systems.
- Remember one set of keybindings; IDEs come and go but vi is eternal.
- It's customizable and scriptable; all the features of any IDE via plugins
- It's free and open source.

The biggest thing that keeps people from using vim is the learning curve.
Vim is no different than anything else that's rewarding, it requires some
upfront effort; but the payoff is worth it. Probably the best way to start is
the `vimtutor` command.


## Spelling
Turn on spell checking with `:set spell` (`nospell` to turn off, or `invspell`
to toggle).

- `]s` jump to next misspelled word
- `[s` jump to previous misspelled word
- `z=` on a misspelled word to correct it


## Search
- `/` to forward search for pattern, `?` for backwards search
- `*` to forward search for word under cursor, `#` to backwards search
  (very useful for finding usages of variables in code)
- `n` to go to next search match, `N` for previous
