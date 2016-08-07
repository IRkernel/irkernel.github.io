---
layout: default
title: repr
docindex: repr
---
## [0.8](0.8): Version 0.8

* [#60] Avoid repr of `list`s with unrepr’able items
* [#63] Correctly check for the Cairo package’s availability at runtime instead of compile time
* [#65] Greatly improve `matrix`/`data.frame` handling robustness by rewriting limiting code
* [#75] Don’t let HTML collapse spaces in strings anymore

## [0.7](0.7): Version 0.7

* Fixed `factor` handling in `data.frame`s
* Handle POSIXt dates
* Added `rows`/`cols` argument to `matrix`/`data.frame` reprs
* Added `packageIQR` reprs (informational lists like `vignette(package = '...')` and `data(package = '...')`)

## [0.6](0.6): Version 0.6

CRAN release! (nothing else really)

## [0.5](0.5): Version 0.5

* Circumvented many bugs relating to the poor unicode support of R under Windows
* Fixed some bugs around arrays
* Added basic htmlwidget repr
* Export option defaults
* Added LaTeX and HTML escaping

## [0.4](0.4): Version 0.4

Limits display of data.frames and matrices to a max number of rows/columns.

Added the options `repr.matrix.max.rows` (default: 60) and `repr.matrix.max.cols` (default: 20)

## [0.3](0.3): Version 0.3

Fixed capability detection, so that pngs and jpg are created using the best existing device on each OS

