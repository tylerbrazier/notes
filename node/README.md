All the boilerplate files for starting a node.js project.
Remember to set a name and version in `package.json`.

Development Setup:

	npm install

	# lint and format
	npm run check [...files]

	npm test

	node --watch ...

For neovim, install <https://github.com/neovim/nvim-lspconfig>
and add to `~/.config/nvim/init.lua`: `vim.lsp.enable('biome')`
