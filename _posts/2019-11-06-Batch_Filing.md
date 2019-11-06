---
tags:
- draft

---

# Batch Filing



This is how I move files to be published into the published folder and the remainder into the unpublished folder.

```bash
echo off
setlocal EnableDelayedExpansion
set i=0
for /F %%a in (published.txt) do (
   set /A i+=1
   set array[!i!]=%%a
)
set n=%i%

REM Move only the files matching the substr in out list
for %%f in (*.doc *.doc *.pdf) do (
  set /p val=<%%f
  rem echo "fullname: %%f"
  rem echo "name: %%~nf"

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



