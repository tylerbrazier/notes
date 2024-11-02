`iwctl`

    station wlan0 scan
    station wlan0 get-networks
    station wlan0 connect ...

To see a network's passphrase (as root):

    cat /var/lib/iwd/NETWORK.psk
