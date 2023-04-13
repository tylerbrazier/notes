Convert .mkv to .mp4 (https://askubuntu.com/a/396906):

    ffmpeg -i input.mkv -codec copy output.mp4

Convert other audio to .mp3 (https://stackoverflow.com/q/3255674):

    ffmpeg -i input.whatever -acodec libmp3lame output.mp3
    # Though I found that leaving out -acodec does the same thing:
    ffmpeg -i input.whatever output.mp3
