#devtools::install_github("hadley/pkgdown")
library(pkgdown)
library(methods)

args <- commandArgs(trailingOnly = TRUE)
package_path <- normalizePath(args[[1]])

dst <- as_pkgdown(args[[1]])$dst_path
#print(dst); stop()
if (grepl('/docs$', dst))
	stop('Dst set incorrectly:', dst)

build_articles(package_path)
build_reference(package_path)
