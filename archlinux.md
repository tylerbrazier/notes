<https://www.archlinux.org/>

# Desktop/Laptop

## Download/Install
Download from <https://www.archlinux.org/download/>.
Verify the ISO's integrity by comparing the md5 checksum on the download page
to the output of `md5sum archlinux-*.iso`.

Copy the ISO to a usb drive (`cat` works, but must be `root`).
See <https://wiki.archlinux.org/index.php/USB_flash_installation_medium>.

Follow the [Installation guide](https://wiki.archlinux.org/index.php/Installation_guide).
See **Packages** below for a list to `pacstrap`.

## Bootloader/GRUB
I mounted the EFI system partition (esp) to `/efi` because `/boot` is where the kernels go and the esp isn't big enough to fit the kernels.

For setting up Windows dual boot, os-prober couldn't detect the partition from the chroot so the following steps need to be done from the newly booted system:

- Install `os-prober`
- Edit `/etc/default/grub` and set `GRUB_DISABLE_OS_PROBER=false`
- Mount the windows partition (doesn't matter where; `/mnt` works) and esp
- Run again: `grub-mkconfig -o /boot/grub/grub.cfg`

## Post-installation
    useradd -m -G wheel -s /bin/bash tyler
    passwd tyler

    EDITOR=vim visudo
    # uncomment this line to allow wheel group to sudo w/out a password:
    %wheel ALL=(ALL:ALL) NOPASSWD: ALL

    # as the new user:
    ssh-keygen
    git clone git@github.com:tylerbrazier/dotfiles.git

To set up [hibernation](https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate#Hibernation):

- Set up a swap file: <https://wiki.archlinux.org/index.php/swap#Swap_file>.
- Add the `resume` hook to `/etc/mkinitcpio.conf` (see
  <https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate#Configure_the_initramfs>).
- Run `filefrag -v /swapfile` and copy the first value
  (without trailing periods) under `physical_offset` from the first row.
- Also copy the UUID of the disk with the `/swapfile` using
  `lsblk -f` or `blkid`.
- Edit `/etc/default/grub` and append the kernel params to
  `GRUB_CMDLINE_LINUX_DEFAULT`:
  `resume=UUID=<id>` and `resume_offset=<offset>`
- Regenerate grub config: `grub-mkconfig -o /boot/grub/grub.cfg`.
- Consider reducing swappiness if you have plenty of RAM:
  <https://wiki.archlinux.org/index.php/Swap#Swappiness>.
- Regenerate the initramfs with `mkinitcpio -P`.
- Reboot (or edit `/sys/power/resume` according to the wiki).

## Packages
    bash-completion
    vim
    iwd         # for wifi
    mandoc
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
(see <https://wiki.archlinux.org/title/Power_management/Wakeup_triggers#Instantaneous_wakeups_from_suspend>):

    # check enabled devices:
    cat /proc/acpi/wakeup

    # toggle enabled/disabled by echoing the device name to the file:
    echo XHC > /proc/acpi/wakeup

    # to persist across reboots:
    vim /etc/tmpfiles.d/100-disable-device-wakeup.conf
        # Path              Mode UID GID Age Argument
        w /proc/acpi/wakeup -    -   -   -   XHC

## Auto login
<https://wiki.archlinux.org/title/getty#Automatic_login_to_virtual_console>

## GUI (sway)
Install:

    sway
    mesa        # intel video drivers
    ttf-dejavu  # needs a font
    foot        # sway's default term
    foot-terminfo
    dmenu
    i3status
    swayidle
    swayimg
    swaybg
    wl-clipboard
    mpv
    mpv-mpris             # for play/pause/etc keys
    playerctl             # for play/pause/etc keys (firefox/vlc/etc)
    brightnessctl         # for adjusting screen brightness
    grim                  # screenshots
    slurp                 # select screen region for screenshots
    xorg-server-xwayland  # needed to run X11 programs
    firefox               # and/or chromium
    alsa-utils            # sound control from userspace
    archlinux-wallpaper   # backgrounds

Then as root:

    systemctl start/enable seatd.service
    gpasswd -a tyler seat

To automatically start sway on login:
<https://wiki.archlinux.org/title/sway#Automatically_on_TTY_login>.
(I put the configuration in `~/.bash_profile` since my `~/.bashrc` may be overwritten
from [dotfiles](https://github.com/tylerbrazier/dotfiles).)

## Pacman
If `pacman -Syu` fails with key or signature errors try `pacman -S archlinux-keyring` then `pacman -Su` again.

# Server

<https://wiki.archlinux.org/title/Arch_Linux_on_a_VPS#DigitalOcean>
Only the `cloud-init` image works for DO.

Both `root` and `arch` had locked passwords (`passwd -Sa` outputs second field as `L`).
I'm guessing it's because I had DO add my ssh key to the droplet.

    pacman -Syu
    pacman -S neovim

    nvim /etc/ssh/sshd_config
        PermitRootLogin prohibit-password
        PasswordAuthentication no

    sshd -t  # test configuration is valid (good if no output)
    systemctl reload sshd

In case ssh keys are lost, I still want to be able to log in thru DO console,
so set a password for the `arch` user (he can `sudo`; see `/etc/sudoers.d/90-cloud-init-users`).

    passwd arch

Had to reboot before I could log in thru DO console.

To add another public key to the server, upload it to github and use:

    cd ~/.ssh
    curl https://github.com/tylerbrazier.keys >> authorized_keys
    sort -uo authorized_keys authorized_keys  # remove duplicates
