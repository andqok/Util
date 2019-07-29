; ~~~~~~~~~~~~ Start Program or Switch to It ~~~~~~~~~~~~~~~~~~

; ~~~~~~~~~~~  Chrome   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
f1::
if WinExist("ahk_exe chrome.exe")
  WinActivate, ahk_exe chrome.exe
else
  Run chrome.exe
Return


; ~~~~~~~~~~~   Word   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
f4::
if WinExist("ahk_exe WINWORD.EXE")
  WinActivate, ahk_exe WINWORD.EXE
else
  Run WINWORD.EXE
Return

; ~~~~~~~~~~~   Excel   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
f6::
if WinExist("ahk_exe EXCEL.EXE")
  WinActivate, ahk_exe EXCEL.EXE
else
  Run EXCEL.EXE
  WinActivate, ahk_exe EXCEL.EXE
Return

AppsKey::
if WinExist("ahk_exe Everything.exe")
  WinActivate, ahk_exe Everything.exe
else
  Run "C:\Program Files\Everything\Everything.exe"
  WinActivate, ahk_exe Everything.exe
return

^AppsKey::
Send, !{Space}
return
