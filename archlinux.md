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

## GUI (sway)
Install:

	sway
	mesa        # intel video drivers
	ttf-dejavu  # needs a font
	alacritty
	dmenu
	i3status
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

Things to add to the sway config:

	# run `swaymsg -t get_inputs` to find the keyboard's <identifier>
	input <identifier> repeat_delay 200

	# for HiDPI displays
	# run `swaymsg -t get_outputs` to find the monitor's <name>
	output <name> scale 1.2

	bindsym XF86MonBrightnessDown exec brightnessctl set 5%-
	bindsym XF86MonBrightnessUp exec brightnessctl set 5%+
	bindsym XF86AudioRaiseVolume exec amixer set Master 5%+
	bindsym XF86AudioLowerVolume exec amixer set Master 5%-
	bindsym XF86AudioMute exec amixer set Master toggle

	bar {
	    ...
	    status_command i3status
	    ...
	}

Add this to `~/.config/i3status/config` for showing volume status
(remember to add `order += "volume master"`):

	volume master {
		format = "♪: %volume"
		format_muted = "♪: muted (%volume)"
	}
