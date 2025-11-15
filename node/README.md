All the boilerplate files for starting a node.js project.
Remember to set a name and version in package.json.

Development Setup:

	npm install

	# for easy linting with :make in vim:
	mkdir -p $HOME/.vim/ftplugin/javascript
	echo 'setl mp=npx\ eslint\ -f\ unix' \
		> $HOME/.vim/ftplugin/javascript/lint.vim

	node --watch ...
	# or in vim :term node --watch ...
