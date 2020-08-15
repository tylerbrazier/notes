# Arch Linux
<https://www.archlinux.org/>

## Download/Install
Download from <https://www.archlinux.org/download/>.
Verify the ISO's integrity by comparing the md5 checksum on the download page
to the output of `md5sum archlinux-*.iso`.

Copy the ISO to a usb drive (`cat` works, but must be `root`).
See <https://wiki.archlinux.org/index.php/USB_flash_installation_medium>.

Follow the [Installation guide](https://wiki.archlinux.org/index.php/Installation_guide).
See Packages below for a list to `pacstrap`.

## Packages
	bash-completion
	vim
	tmux
	man-db
	man-pages
	grub
	efibootmgr  #https://wiki.archlinux.org/index.php/GRUB#UEFI_systems
	os-prober   #for dual-booting
	intel-ucode
	sudo
	git
