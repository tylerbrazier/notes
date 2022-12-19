Print all file paths in this dir recusively (like a lame version of `tree`):

    find . -type f -print
    # types: f=file d=directory l=link

For all files/dirs that include a space, rename spaces to underscores:

    find . -name '* *' -exec rename -a -v ' ' _ '{}' \;
    # {} will be the path to the file
    # -exec considers everything before ; to part of the command
    # (need the \ so bash doesn't interpret the ;)

Compress all jpg images with size >1M in this dir recusively:

    find . -type f -name '*.jpg' -size +1M -exec magick '{}' -quality 10% '{}' \;
