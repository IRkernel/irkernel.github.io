# Add new releases

## Add source packages (also used on linux systems)

```
# this assumes that both the irkernel.github.io and all the packages are checked out in this dir
# it also assumes that all repos are checkout at the version you want to add to the irkernel.github.io 
# and that irkernel.guthub.io is up to date
R CMD build <package>
R CMD check <package>*.tar.gz
mv <package>*.tar.gz irkernel.github.io/src/contrib/
cd irkernel.github.io
R --slave -e "tools::write_PACKAGES('src/contrib', type='source')"
git add src/contrib
git commit -m "New source version of <package> <tag/commit>"
```

## Add windows packages

Binaries have to be compiled for all currently available R versions (as of June 2015: 3.1 and 3.2).

```
set OLDPATH=%path%
# First for 3.1
# adjust path as needed...
set path=c:\Rtools\bin;c:\Rtools\gcc-4.6.3\bin;C:\Program Files\R\R-3.1\bin\x64;%OLDPATH% 
R CMD INSTALL --build --compile-both <package>
move <package>*.zip irkernel.github.io\bin\windows\contrib\3.1\
# now for 3.2
# adjust path as needed...
set path=c:\Rtools\bin;c:\Rtools\gcc-4.6.3\bin;C:\Program Files\R\R-3.2\bin\x64;%OLDPATH% 
R CMD INSTALL --build --compile-both <package>
move <package>*.zip irkernel.github.io\bin\windows\contrib\3.2\
cd irkernel.github.io
R --slave -e "tools::write_PACKAGES('bin/windows/contrib/3.1', type='win.binary')"
R --slave -e "tools::write_PACKAGES('bin/windows/contrib/3.2', type='win.binary')"
git add bin/windows/contrib/
git commit -m "New windows binaries of <package> <tag/commit>"
```

## Add macosx packages

[This is untested, please send patches...]

```
# First for 3.1
# adjust path as needed...
/path/to/R/3.1/R CMD INSTALL --build --compile-both <package>
mv <package>*.tgz irkernel.github.io/bin/macosx/mavericks/contrib/3.1
# now for 3.2
# adjust as needed...
/path/to/R/3.2/R CMD INSTALL --build --compile-both <package>
mv <package>*.tgz irkernel.github.io/bin/macosx/mavericks/contrib/3.2
cd irkernel.github.io
R --slave -e "tools::write_PACKAGES('bin/macosx/mavericks/contrib/3.1', type='mac.binary')"
R --slave -e "tools::write_PACKAGES('bin/macosx/mavericks/contrib/3.2', type='mac.binary')"
git add bin/macosx/mavericks/contrib
git commit -m "New macosx binaries of <package> <tag/commit>"
```
