# [imagemagick](https://imagemagick.org/)

Get info about an image:

    magick identify input.jpg

Resize an image to 20% of the original:

    magick input.jpg -resize 20% output.jpg

Resize an image to specific size:

    magick input.jpg -resize 800x600 output.jpg

Convert heic to jpeg:

    magick input.heic output.jpg

Compress an image to 10% of its original quality:

    magick input.jpg -quality 10% out.jpg

PDF to JPG (using `poppler`):

    pdftoppm -jpeg input.pdf output
