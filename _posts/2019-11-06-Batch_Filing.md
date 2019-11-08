---
title: Batch Script For Moving Files
layout: article_post
section: article
layout: article_post
excerpt: Sometimes you have to move a significant amount of files to another directory.
tags:
---

# Batch Script For Moving Files

Sometimes you have to move a significant amount of files to another directory. It can be tiresome and tedious to do by hand in the file explorer. Here is a batch script that will move files into specified folders.

 You must place a list of file names in a a file *published.txt*. The script will  check the current directory for files (with extensions: .doc .doc .pdf) containing any of the names in *published.txt* and move those files to a directory titled *published*. The remainder of the files in the current directory will be transferred to *unpublished*.

```bash

mkdir published
mkdir unpublished

echo off
setlocal EnableDelayedExpansion
set i=0

REM parse published.txt and get the list of file names (these can be partial file names)
for /F %%a in (published.txt) do (
   set /A i+=1
   set array[!i!]=%%a
)
set n=%i%

REM Move only the files matching the substr in out list
for %%f in (*.doc *.doc *.pdf) do (
  set /p val=<%%f
  REM echo "full file name: %%f"
  REM echo "file name: %%~nf"

	REM 
	for /L %%i in (1,1,%n%) do (
		SET STRING=%%~nf
		SET SUBSTRING=!array[%%i]!
		ECHO !STRING! | FINDSTR /C:"!SUBSTRING!" >nul & IF ERRORLEVEL 1 (
			rem move %%ff "%%~dpfunpublished"
			rem ECHO "moving %%~ff to %%~dpfunpublished"
		) else (
			ECHO moving %%~ff to %%~dpfpublished
			move %%~ff "%%~dpfpublished"
		)
	)
)

for %%f in (*.doc *.doc *.pdf) do (
	ECHO moving %%~ff %%~dpfunpublished
	move %%~ff "%%~dpfunpublished"
)

```

Currently it does not work with files containing spaces, but I will fix that soon. 



