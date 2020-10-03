Download audio and videos from youtube.
<https://ytdl-org.github.io/youtube-dl/index.html>

Useful `~/.bashrc` aliases:

	alias yd='/path/to/youtube-dl --restrict-filenames -o "%(title)s.%(ext)s"'
	alias ydp='/path/to/youtube-dl --restrict-filenames -o "%(playlist)s/%(playlist_index)s-%(title)s.%(ext)s"'

Common options:

	-x                (extract audio only; useful for songs)
	--audio-format    ('best' by default)
	--add-metadata    (tag the video/audio)
	--playlist-items  (choose specific videos from playlist)
	--ignore-errors   (to skip unavailable videos)

All options: <https://github.com/ytdl-org/youtube-dl/blob/master/README.md#options>
