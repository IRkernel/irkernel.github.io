library(tools)
library(staticdocs)

args <- commandArgs(trailingOnly = TRUE)
rd_path <- args[[1]]
html_path <- args[[2]]
pkg_name <- args[[3]]
pkg_ver <- args[[4]]

recommended_pkgs <- c(
	'KernSmooth', 'MASS', 'Matrix', 'base', 'boot', 'class', 'cluster', 'codetools', 'compilerdatasets',
	'foreign', 'grDevices', 'graphics', 'grid', 'lattice', 'methods', 'mgcv', 'nlme', 'nnet', 'parallel',
	'rcompgen', 'rpart', 'spatial', 'splines', 'stats', 'stats4', 'survival', 'tcltk', 'tools', 'utils')
base_url <- 'https://stat.ethz.ch/R-manual/R-devel/library'

rd <- staticdocs:::cached_parse_Rd(rd_path)
html <- staticdocs:::to_html.Rd_doc(rd)
html <- c(html, package = pkg_name, version = pkg_ver, pagetitle = html$name)
render_page(list(sd_path = ''), 'topic', html, html_path)
