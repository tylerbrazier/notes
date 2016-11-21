# Generate a private RSA key
# (to encrypt it, include -aes-256-cbc)
openssl genpkey -algorithm RSA -out key.pem -pkeyopt rsa_keygen_bits:4096

# Create a self-signed cert based on the key
openssl req -key key.pem -x509 -new -days 3650 -out cert.pem

# The key should only be readable by the user running the web server
chmod 600 key.pem
chown somebody key.pem
