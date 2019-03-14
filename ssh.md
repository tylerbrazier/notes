# Generating keys

It's better to generate a keypair per machine rather than having one pair of
keys for all of your devices because if one machine is compromised then that
key can be revoked individually. It's also easier when setting up a computer
to just generate a new pair of keys instead of fussing with copying files.

    ssh-keygen -C "optional comment to help identify the key"

Use `ssh-copy-id` to copy the public key to a remote server.

[Arch wiki](https://wiki.archlinux.org/index.php/SSH_keys) has more info.

# Remote Forwarding

You can use SSH to connect to another computer sitting behind a NAT (e.g. your
Raspberry Pi at home) by setting up a tunnel between the pi and your
server. For this example, 'rpi' will be the machine we want to connect to.

    client ---- server ---- NAT -- rpi

`sshd` will need to be running on the server and on rpi. On the server, create
an unprivileged user that rpi can log in as:

    useradd -m pi -s /bin/bash
    passwd pi

On rpi, generate an SSH key pair without a passphrase (so it can be used
automatically on boot) and upload the public key to the server. You should now
be able to log into the server from rpi and create the tunnel:

    ssh -n -N -T -R 2222:localhost:22 pi@server

- `-n` means don't read from stdin (actually redirect `/dev/null` to stdin).
- `-N` means we don't need to execute a remote command, just do the tunneling.
- `-T` means don't allocate a pseudo-tty on the server.
- `-R` sets up the tunnel - it opens port 2222 on the server and forwards
  connections coming into that port to rpi (localhost) on port 22.

Finally, on the server as your normal user:

    ssh -l pi -p 2222 localhost

There's an example `tunnel.service` systemd unit included in the `examples/`
dir that can be enabled on rpi to automatically start the tunnel on boot.

You can use this method to forward traffic on any port (e.g. http) but by
default, ssh only allows localhost traffic from the server to be forwarded
(for security). To enable forwarding external traffic to your server, set
`GatewayPorts yes` in `/etc/ssh/sshd_config` and run `systemctl reload sshd`.
Remember to adjust your iptables as needed.
