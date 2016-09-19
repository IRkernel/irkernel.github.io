---
layout: default
title: IRkernel
docindex: IRkernel
---
## [0.7](0.7): 0.7

* [#264] Abort queued cell executions when an error occurs
* [#276] Added flag that tells if you’re in a kernel: `getOption('jupyter.in_kernel', FALSE)`
* [#272] Added Comm message support (for e.g. [widgets](https://github.com/jupyter-incubator/declarativewidgets))
* [#285] Isolate full HTML pages in iframes (also useful for widgets)
* [a7f91315d6ccf4c6e8d06d73cc770e21468b3488] Added the ability to use `repr.plot_width`/`height` between two plots in the same cell. (sorry for the messed up commit message)
* [3ff41c733aaba801823217135e5371fc934292eb] Added the `jupyter.pager_classes` option to control what to show in a pager (currently `vignette()` lists and `help()`)
* [#293] Added a `jupyter.logfile` option and the environment variables `JUPYTER_LOG_LEVEL` and  `JUPYTER_LOGFILE`
* [#324] Add our own `quit()`/… functions to a new environment so they survive workspace cleaning.
* [4d4193ff2a041650b24364ecee1493ce595e1b5c] Added a [kernel.js](https://carreau.gitbooks.io/jupyter-book/content/kerneljs.html) with the custom key bindings <kbd>Alt</kbd><kbd>-</kbd> (inserts <code> &lt;- </code>) and <kbd>F1</kbd> (gives contextual help for the word under the cursor)
* [#406] Add support for [`.Last.value`](http://www.rdocumentation.org/packages/base/versions/3.3.1/topics/Last.value)

## [0.6.1](0.6.1): 

- fixed typo in `dQuote` calls

## [0.6](0.6): 

### New features

- [#196] Made `quit()`/`q()` work
- [#203] Added a Dockerfile
- [#252] Possibility to install multiple kernel specs

### Change of behavior

- [#238] Switched to pbdZMQ to hopefully make setup woes a thing of the past!
- [#251] Use `display_data` instead of `execute_result` for output

### Notable bug fixes

- [#222] Show traceback on error (and don’t continue execution!)
- [#224] Mark JSON as UTF-8 to prevent encoding errors
- [bcaea6800a76c76740d6f01818d302674aa73da6] don’t use unicode in the source to not break windows


## [0.5](0.5): 

### New features

* [#153] support `shutdown_request`

### Changes of behavior

* [#173] Use full path to R interpreter for `kernelspec.json`
* [#154] Remove JPG and PDF from default output formats
* [361c676e0d9abe1fca9c7bace7a5038238fea8ee] use `jupyter` binary per default

### Other

* Full code cleanup
* Bulk of the readme extracted to https://irkernel.github.io

