Download audio and videos from youtube.
<https://youtube-dl.org/>

(~~[youtube-dlc](https://github.com/blackjack4494/yt-dlc)~~
[yt-dlp](https://github.com/yt-dlp/yt-dlp) is an alternative.)

Useful `~/.bashrc` aliases:

	alias yd='youtube-dl --restrict-filenames -o "%(title)s.%(ext)s"'
	alias ydp='youtube-dl --restrict-filenames -o "%(playlist)s/%(playlist_index)s-%(title)s.%(ext)s"'

Common options:

	-x                (extract audio only; useful for songs)
	--audio-format    ('best' by default)
	--add-metadata    (tag the video/audio)
	--playlist-items  (choose specific videos from playlist)
	--ignore-errors   (to skip unavailable videos)

All options: <https://github.com/ytdl-org/youtube-dl/blob/master/README.md#options>
