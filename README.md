[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Kindle Highlight

> This little node script can fetch all the highlights from you Kindle and show any random one in your terminal.

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Getting Started

This script works by fetching all the highlights from your Kindle and saving them in a JSON file.
And then it will show you a random highlight in your terminal. One caveat is that the highlights may not be up to date with the latest version of your Kindle. So, you will have to update it manually by running the update command.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

You could run the script without installing it with `npx`. If have decided to install it anyway it's recommended to install it globally, run:

```sh
$ npm install -g kindle-highlight
```

After installing it globally, you don't have to run it with `npx` anymore.

## Usage

### Sync with Kindle Highlights

```sh
$ npx kindle-highlight update <username> <password>
```

It's recommended to provide the execution path of any chromium based browser like Google Chrome or the new Edge. This could avoid being prompted for captcha.

You can provide the path to the browser binary with `--exec` option. This option is optional.

You can get the executable path by going to `chrome://version`.

```sh
$ npx kindle-highlight update <username> <password> --exec /path/to/browser/executable
```

### Show a random highlight

Before you run this script, you should have synced your Kindle highlights with `npx kindle-highlight update`.


```sh
$ npx kindle-highlight highlight
```

You could also run this script every time you want to see a random highlight. For example, you could make it run every time you open up a new terminal.

## Authors

- **Amal Rajan** - _Initial work_ - [Amal](https://github.com/amalrajan30)
