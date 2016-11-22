Remote Forwarding
-----------------
You can use SSH to connect to another computer sitting behind a NAT (e.g. your
[raspberry pi][0] at home) by setting up a tunnel between the pi and your
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


[0]: https://en.wikipedia.org/wiki/Raspberry_Pi
