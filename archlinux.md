# Arch Linux
<https://www.archlinux.org/>

## Download/Install
Download from <https://www.archlinux.org/download/>.
Verify the ISO's integrity by comparing the md5 checksum on the download page
to the output of `md5sum archlinux-*.iso`.

Copy the ISO to a usb drive (`cat` works, but must be `root`).
See <https://wiki.archlinux.org/index.php/USB_flash_installation_medium>.

Follow the [Installation guide](https://wiki.archlinux.org/index.php/Installation_guide).
See **Packages** below for a list to `pacstrap`.

## Packages
	bash-completion
	vim
	tmux
	iwd         # for wifi
	man-db
	man-pages
	grub
	efibootmgr  # https://wiki.archlinux.org/index.php/GRUB#UEFI_systems
	os-prober   # for dual-booting
	intel-ucode
	sudo
	git
	openssh
	htop

### Post-installation
	useradd -m -G wheel -s /bin/bash tyler
	passwd tyler

	EDITOR=vim visudo
	# uncomment this line to allow wheel group to sudo w/out a password:
	%wheel ALL=(ALL) NOPASSWD: ALL

	ssh-keygen

**TODO** swap and hiberate setup:
<https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate>

## Network
<https://wiki.archlinux.org/index.php/Network_configuration>

For wireless, [iwd](https://wiki.archlinux.org/index.php/Iwd) is good.
Edit `/etc/iwd/main.conf` and add:

	[General]
	# let iwd handle getting an IP address
	EnableNetworkConfiguration=true

	[Network]
	# use systemd-resolvd for DNS:
	NameResolvingService=systemd

Then:

	systemctl start/enable iwd.service
	systemctl start/enable systemd-resolvd.service
