Passwords
=========
When you sign up at some website and give them a password, you're trusting them
to keep that password secure. Security is hard to get right and passwords are
compromised all the time. Because of this, it's very important to not to use the
same password for multiple sites; if someone were to steal your password on one
site, you don't want him using that password to get into everywhere else too.

The trouble is that remembering a different password for every site you go to
is not feasible. Instead, you can incorporate the site's domain name into your
password. For example, a naive way of doing it would be using a
[Caesar cipher][0] on the domain name to generate your password for that site;
so the password for `example.com` would be `buxjmib`. Of course, you'll probably
want to use your own cipher and you should incorporate capitals, special
characters, and numbers somehow.

This way, you will have a unique password for each website (depending on your
cipher obviously) and you only need to remember your cipher rather than trying
to memorize many different passwords.

It's probably a good idea to write down your cipher (actually write, on paper)
and keep it somewhere safe (not on your computer or some other server).

Also, 2 factor auth is awesome; use it on sites that support it and write down
(actually write, or print) the recovery codes. Keep them off of your computer.


[0]: https://en.wikipedia.org/wiki/Caesar_cipher
