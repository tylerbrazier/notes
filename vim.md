# Vim notes

`=` followed by a motion to auto indent;
e.g. `=G` will indent all the lines from cursor until end of file.
`==` to auto indent current line.
See also the `'autoindent'` option.

`=']` after put will auto indent the text that was put. (the `']` motion is
'to the end of last changed text').

`%` can be used to refer to the current file when typing a command line
(i.e. commands starting with `:`).
e.g. `:term git log -p %` to see the history of the current file.

`ctrl-^` to go to the previously edited file (aka the "alternate" file).
`ctrl-6` usually works too.

`*` on a word will search for that word.
`n` to jump to the next occurrence.
`N` to jump to the previous occurrence.
Turn on `hlsearch` to highlight the occurrences.

`g;` to jump back to where text was last changed.
Repeat `g;g;g;`... to keep jumping back to older change locations.
(`:help changelist` for more info.)

Delete traling whitespace: `:%s/\s\+$//`

To put a newline after each *pattern*:
`:g/pattern/normal o`

To delete all empty lines:
`:g/^$/d _`
(the blackhole register `_` is used to save time)

<https://gist.github.com/romainl/4b9f139d2a8694612b924322de1025ce>
