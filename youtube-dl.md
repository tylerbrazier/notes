Download audio and videos from youtube.
<http://yt-dl.org/>

**NOTE** since youtube-dl has been taken down, instead use
[youtube-dlc](https://github.com/blackjack4494/yt-dlc).
Use `pip` to install and update.

Useful `~/.bashrc` aliases:

	alias yd='youtube-dlc --restrict-filenames -o "%(title)s.%(ext)s"'
	alias ydp='youtube-dlc --restrict-filenames -o "%(playlist)s/%(playlist_index)s-%(title)s.%(ext)s"'

Common options:

	-x                (extract audio only; useful for songs)
	--audio-format    ('best' by default)
	--add-metadata    (tag the video/audio)
	--playlist-items  (choose specific videos from playlist)
	--ignore-errors   (to skip unavailable videos)

All options: <https://github.com/blackjack4494/yt-dlc#options>
