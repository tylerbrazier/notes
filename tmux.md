# tmux
```
tmux                # new session
tmux new -s mysesh  # new named session
tmux ls             # list sessions
tmux a              # attach to recent session
tmux a -t mysesh    # attach to named session
```

By default, prefix all bindings with `ctrl+b`, followed by:
```
c  create a new window
n  next window
p  previous window
,  rename window
0  go to window 0
...
9  go to window 9

%  split pane vertically
"  split pane horizontally
o  go to next (other) pane
!  move pane to a new window
x  kill pane

$  rename session
d  detach session

[  copy mode (for moving around in history)

:  prompt to enter tmux command (e.g. new or ls)
?  list bindings
```
