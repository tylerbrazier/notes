# Vim notes

`=` followed by a motion to auto indent;
e.g. `=G` will indent all the lines from cursor until end of file.
`==` to auto indent current line.

`=']` after put will auto indent the text that was put. (the `']` motion is
'to the end of last changed text').

`%` can be used to refer to the current file when typing a command line
(i.e. commands starting with `:`).
e.g. `:term git log -p %` to see the history of the current file.
