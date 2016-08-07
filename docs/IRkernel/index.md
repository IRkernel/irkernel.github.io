---
layout: default
title: IRkernel
docindex: IRkernel
---
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

