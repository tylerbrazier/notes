# Node project template
Starting point for a node app.

Copy this whole directory (including the hidden files) to a new project:

    cp -r node/ ~/myproject

Change the `TODO`s in `package.json`: `name`, `description`, and `repository.url`.
Also change this readme.

Run `npm install` to install dependencies. `npm install <package>` to add a new package.

Run `npm outdated` to see outdated packages.

For development, run `npm run dev` which lints and restarts on save and enables debugging.
To change any of that, edit `scripts.dev` in `package.json`.
