[Pacman](https://wiki.archlinux.org/index.php/pacman) command reference
=======================================================================
- Install packages (`y` to refresh db first): `pacman -Sy packages...`
- Upgrade all installed packages: `pacman -Syu`
- Remove packages (and deps): `pacman -Rs packages...`
- Show package info: `pacman -Qi package`
- Show which package a file came from: `pacman -Qo file`
- Or which package a command came from `pacman -Qo $(which command)`
