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

## Post-installation
	useradd -m -G wheel -s /bin/bash tyler
	passwd tyler

	EDITOR=vim visudo
	# uncomment this line to allow wheel group to sudo w/out a password:
	%wheel ALL=(ALL) NOPASSWD: ALL

	# as the new user:
	ssh-keygen
	curl -L http://tylerbrazier.com/dotfiles/install.sh | bash

To set up [hibernation](https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate#Hibernation):

- Set up a swap file: <https://wiki.archlinux.org/index.php/swap#Swap_file>
- Get the UUID of the disk with the `/swapfile` using `lsblk -f` or `blkid`.
- Edit `/etc/default/grub` and append the kernel param `resume=UUID=<id>` to `GRUB_CMDLINE_LINUX_DEFAULT`
- Run `filefrag -v /swapfile` and copy the first value (without trailing periods) under `physical_offset` from the first row
- Edit `/etc/default/grub` and append the kernel param `resume_offset=<offset>` to `GRUB_CMDLINE_LINUX_DEFAULT`
- Regenerate grub config: `grub-mkconfig -o /boot/grub/grub.cfg`
- Consider reducing swappiness if you have plenty of RAM: <https://wiki.archlinux.org/index.php/Swap#Swappiness>
- Add the `resume` hook to `/etc/mkinitcpio.conf` (see <https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate#Configure_the_initramfs>)
- Regenerate the initramfs with `mkinitcpio -P`
- Reboot (or edit `/sys/power/resume` according to the instructions on the wiki)

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
	ntfs-3g     # to mount ntfs drives
	intel-ucode
	sudo
	git
	openssh
	htop
	base-devel  # for AUR

## AUR
<https://wiki.archlinux.org/title/Arch_User_Repository>

	makepkg -sirc  # syncdeps, install, rmdeps, clean

## Network
<https://wiki.archlinux.org/index.php/Network_configuration>

### Wireless
For wireless, [iwd](https://wiki.archlinux.org/index.php/Iwd) is good.
Edit `/etc/iwd/main.conf` and add:

	[General]
	# let iwd handle getting an IP address (DHCP)
	EnableNetworkConfiguration=true

	[Network]
	# use systemd-resolved for DNS:
	NameResolvingService=systemd

Then:

	systemctl start/enable iwd.service
	systemctl start/enable systemd-resolved.service

### Wired
[systemd-networkd](https://wiki.archlinux.org/index.php/Systemd-networkd)
can handle getting an IP address (DHCP);
create a file `/etc/systemd/network/20-wired.network` with:

	[Match]
	Name=en*

	[Network]
	DHCP=yes

Then:

	systemctl start/enable systemd-networkd.service
	systemctl start/enable systemd-resolved.service

## Power management
To prevent keyboard/mouse from waking the machine from suspend
(see <https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate#Instantaneous_wakeups_from_suspend>):

	# check enabled devices:
	cat /proc/acpi/wakeup

	# toggle enabled/disabled by echoing the device name to the file:
	echo USBE > /proc/acpi/wakeup
	echo USE2 > /proc/acpi/wakeup

	# to persist across reboots:
	# (the device names need to be joined together all on one line)
	vim /etc/tmpfiles.d/100-disable-device-wakeup.conf
		#	Path			Mode	UID	GID	Age	Argument
		w	/proc/acpi/wakeup	-	-	-	-	USBEUSE2

I wasn't able to keep the keyboard enabled but the mouse disabled
so I just disabled everything and use the power button to wake from sleep.

## Android
<https://wiki.archlinux.org/title/Media_Transfer_Protocol>

	pacman -S android-file-transfer android-udev
	mkdir ~/mnt
	aft-mtp-mount ~/mnt
	# ...
	umount ~/mnt

## GUI (sway)
Install:

	sway
	mesa        # intel video drivers
	ttf-dejavu  # needs a font
	alacritty
	dmenu
	i3status
	swayidle
	brightnessctl         # for adjusting screen brightness
	playerctl             # for play/pause/etc. keys
	xorg-server-xwayland  # needed to run X11 programs
	firefox               # and/or chromium
	gvim                  # includes clipboard support
	alsa-utils            # sound control from userspace

In firefox, `about:config`:

- disable `browser.chrome.toolbar_tips` because tooltips don't go away when switching windows
- disable `ui.key.menuAccessKeyFocuses` to prevent the menu from popping up on Alt
- disable `browser.fullscreen.autohide` to prevent the top from disappearing on fullscreen
