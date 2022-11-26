# netcat
To transfer files (using gnu's implementation):

    # on the receiving end (9999 is the example port number)
    ip addr   # get my ip address
    nc -l -p 9999 > file

    # on the sending end (x.x.x.x is the receiver's ip address)
    cat file | nc -c x.x.x.x 9999

It's not a bad idea to compare the checksums after the transfer.
