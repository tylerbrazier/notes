Convert .mkv to .mp4 (https://askubuntu.com/a/396906):

    ffmpeg -i input.mkv -codec copy output.mp4

Convert other audio to .mp3 (https://stackoverflow.com/q/3255674):

    ffmpeg -i input.whatever -acodec libmp3lame output.mp3
    # Though I found that leaving out -acodec does the same thing:
    ffmpeg -i input.whatever output.mp3

Cut the first 1m23s out from the song:

    ffmpeg -ss 00:01:23 -i in.mp3 out.mp3

Cut the song after 3m:

    ffmpeg -to 00:03:00 -i in.mp3 out.mp3

Combine `-ss` and `-to` for slicing:

    ffmpeg -ss 00:02:00 -to 00:03:00 -i in.mp3 out.mp3
