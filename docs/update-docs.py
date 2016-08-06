#!/usr/bin/env python3
# if your login username doesn’t equal your github one,
# set the LOGNAME environment variable

import sys
import socket
import tarfile

from pathlib import Path
from getpass import getuser, getpass
from shutil import copyfileobj
from subprocess import run

from packaging.version import Version

from appdirs import user_cache_dir

from github3 import authorize, login
from github3.exceptions import UnprocessableEntity


APPNAME = 'IRkernel docs downloader'
CREDENTIALS_FILE = Path(user_cache_dir(APPNAME, 'Philipp A.')) / 'github-api.token'
HERE = Path(__file__).parent

# http://github3py.readthedocs.io/en/master/
def create_token():
	user = getuser()
	password = ''
	
	while not password:
		password = getpass('Password for {}: '.format(user))
	
	note = '{} on {}'.format(APPNAME, socket.gethostname())
	note_url = 'https://irkernel.github.io/docs'
	scopes = []
	
	try:
		auth = authorize(user, password, scopes, note, note_url)
	except UnprocessableEntity as e:
		print(e, file=sys.stderr)
		for err in e.errors:
			if err.get('field') == 'description' and err.get('code') == 'already_exists':
				print('please delete the token {!r} and try again'.format(note), file=sys.stderr)
				break
		else:
			print(e.errors, file=sys.stderr)
		
		if CREDENTIALS_FILE.is_file():
			CREDENTIALS_FILE.unlink()
		
		sys.exit(1)
	
	CREDENTIALS_FILE.parent.mkdir(parents=True, exist_ok=True)
	with CREDENTIALS_FILE.open('w') as f:
		print(auth.token, file=f)
		print(auth.id, file=f)
	
	return login(user, password)

def auth():
	if CREDENTIALS_FILE.is_file():
		token = id = ''
		with CREDENTIALS_FILE.open('r') as fd:
			token = fd.readline().strip()  # Can't hurt to be paranoid
			id = fd.readline().strip()
		
		gh = login(token=token)
		#auth = gh.authorization(id)
		return gh
	else:
		return create_token()

gh = auth()

org = gh.organization('IRkernel')
for repo in org.repositories():
	if repo.name == 'irkernel.github.io':
		continue
	
	repo_dir = HERE / repo.name
	repo_dir.mkdir(parents=True, exist_ok=True)
	
	releases = sorted(list(repo.releases()), key=lambda r: Version(r.tag_name), reverse=True)
	with (repo_dir / 'index.html').open('w') as repo_index:
		repo_index.write('''---
layout: default
title: {repo.name}
---
<ul>
	{releases}
</ul>
'''.format(repo=repo, releases='\n\t'.join('<li><a href="{r.tag_name}">{r.tag_name}: {r.name}</a><br><pre>{r.body}</pre></li>'.format(r=r) for r in releases)))
	
	for release in releases:
		release_tar = repo_dir / (release.tag_name + '.tar.gz')
		if not release_tar.is_file():
			release_tar_url = repo.archive('tarball', str(release_tar), release.tag_name)
		
		release_dir = repo_dir / release.tag_name
		package_dir = release_dir / 'package'
		package_dir.mkdir(parents=True, exist_ok=True)
		
		with tarfile.open(str(release_tar)) as rel_pkg:
			tar_paths = [Path(i.name) for i in rel_pkg.getmembers() if not i.isdir()]
			paths = [package_dir / Path(*p.parts[1:]) for p in tar_paths]
			for tar_path, path in zip(tar_paths, paths):
				if not path.is_file():
					path.parent.mkdir(parents=True, exist_ok=True)
					with rel_pkg.extractfile(str(tar_path)) as src, path.open('wb') as dst:
						copyfileobj(src, dst)
		
		run(['Rscript', str(HERE / 'convert-rd.r'), str(package_dir), str(release_dir), release.tag_name],
			check=True)
		
		for pdf in HERE.glob('Rplots*.pdf'):
			pdf.unlink()
		
#		with (release_dir / 'index.html').open('w') as release_index:
#			release_index.write('''<!doctype html>
#<meta charset="utf-8">
#<title>{repo.name} “{r.name}” (version {r.tag_name})</title>
#<h1>{repo.name} “{r.name}” (version {r.tag_name})</h1>
#Documentation for <a href="{repo.html_url}">{repo.name}</a> release “<a href="{r.html_url}">{r.name}</a>”
#<h2>Index</h2>
#'''.format(repo=repo, r=release))
