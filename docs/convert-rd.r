library(devtools)
library(staticdocs)

args <- commandArgs(trailingOnly = TRUE)
package_path <- args[[1]]
site_path <- args[[2]]
pkg_ver <- args[[3]]

make_link <- function(loc, label, pkg = NULL) {
	if (is.null(loc$package))
		sprintf('<a href="%s">%s</a>', loc$file, label)
	else #if (loc$package %in% staticdocs:::builtin_packages)
		sprintf('<a href="https://stat.ethz.ch/R-manual/R-devel/library/%s/html/%s.html">%s</a>', loc$package, loc$topic, label)
}
sd_env <- environment(as.sd_package)
unlockBinding('make_link', sd_env)
assign('make_link', make_link, envir = sd_env)
lockEnvironment(sd_env)

#fix broken Authors@R code
dcf_path <- file.path(package_path, 'DESCRIPTION')
i <- read.dcf(dcf_path)
if ('Authors@R' %in% colnames(i) && !grepl('^c', i[, 'Authors@R'])) {
	colnames(i)[colnames(i) == 'Authors@R'] <- 'Authors'
	write.dcf(i, dcf_path)
}

pkg <- as.sd_package(package_path, site_path, TRUE, '_templates')
load_all(pkg)

pkg$topics    <- staticdocs:::build_topics(pkg)
pkg$vignettes <- staticdocs:::build_vignettes(pkg)
pkg$demos     <- staticdocs:::build_demos(pkg)
pkg$readme    <- staticdocs:::readme(pkg)

staticdocs:::build_index(pkg)
