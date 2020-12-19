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

	# as your new user:
	ssh-keygen

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
	intel-ucode
	sudo
	git
	openssh
	htop

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
	xorg-server-xwayland  # needed to run X11 programs
	firefox               # and/or chromium
	gvim                  # includes clipboard support
	alsa-utils            # sound control from userspace

Copy the default configuration:

	mkdir -p ~/.config/sway
	cp /etc/sway/config ~/.config/sway/config

	mkdir ~/.config/i3status
	cp /etc/i3status.conf ~/.config/i3status/config

Things to add to the sway config (`man 5 sway`):

	# Tabbed layout by default.
	workspace_layout tabbed

	# Run `swaymsg -t get_inputs` to find the keyboard's <identifier>
	# or use * for all.
	input <identifier> repeat_delay 200

	# For HiDPI displays.
	# Run `swaymsg -t get_outputs` to find the monitor's <name>
	# or use * for all.
	output <name> scale 1.2

	# Turn off screens after 300s (5m) of inactivity.
	exec swayidle \
		timeout 300 'swaymsg "output * dpms off"' \
		resume 'swaymsg "output * dpms on"'

	bindsym XF86MonBrightnessDown exec brightnessctl set 5%-
	bindsym XF86MonBrightnessUp exec brightnessctl set 5%+
	bindsym XF86AudioRaiseVolume exec amixer set Master 5%+
	bindsym XF86AudioLowerVolume exec amixer set Master 5%-
	bindsym XF86AudioMute exec amixer set Master toggle

	# for aesthetics, arch linux blue looks cool
	client.focused #1793d1 #1793d1 #ffffff
	hide_edge_borders both

	# man 5 sway-bar
	bar {
		...
		status_command i3status

		# for aesthetics, arch linux blue looks cool
		colors {
			focused_workspace #1793d1 #1793d1 #ffffff
		}
		...
	}

Add this to `~/.config/i3status/config` for showing volume status
(remember to add `order += "volume master"`):

	volume master {
		format = "♪: %volume"
		format_muted = "♪: muted (%volume)"
	}
