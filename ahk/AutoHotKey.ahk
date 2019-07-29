XButton1::
  Send, ^{PgDn}
return

XButton2::
  Send, ^{PgUp}
return
; clipboard to file
;!q::
;  Send, ^c
;  Sleep 300
;  Fileappend,%clipboard%`r,C:\Users\Andrew\Documents\clip.txt,UTF-8
;return
; ~~~~~~~~~~ two times Esc to minimize current window
~Esc::
if (A_PriorHotkey <> "~Esc" or A_TimeSincePriorHotkey > 400)
{
    ; Too much time between presses, so this isn't a double-press.
    KeyWait, RControl
    return
}
WinMinimize, A
return
; ~~~~~~~~~~~~~~~~~~ expand snippet
; need tab to expand:
::shn::site:news.ycombinator.com
::srd::site:reddit.com
::shb::site:habrahabr.ru

; expand instantly
:c*:---::{Asc 0151} ; mdash —
:c*:.ii::{U+00B7} ; interpunct ·
:c*:.aa::{U+2042} ; asterism ⁂

:c*:.rarr::{U+2192} ; →
:c*:.uarr::{U+2191} ; ↑
:c*:.darr::{U+2193} ; ↓
:c*:.larr::{U+2190} ; ←

:c*:.star::{U+2605} ; ★
:c*:.vv::{U+2053} ; ⁓

:c*:.lb::{U+00AB} ; «
:c*:.rb::{U+00BB} ; »

:c*:.anno::
  FormatTime, CurrentDateTime,, MMMM d, yyyy
  SendInput %CurrentDateTime%
Return

; ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
:c*:fn::function
:c*:rtr::return{Space}
:c*:tomkv::ls *.mp4|foreach{{}\ffmpeg.exe -i $_ $_.name.replace("mp4", "mkv"){}}
:c*:cutvideo::.\ffmpeg.exe -ss 00:00:00 -i "" -to 01:37:30 -c copy ""

; insert the content of clipboard
:c*:cb::
  Send, ^v
return

; ~~~~~~~~~~~~~~ Insert Current Date ~~~~~~~~~~~~~~~~~~~~~~~~~~

!t::
  FormatTime, Time,, yyyy-MM-dd
  Send %Time%
Return

!y::
  today = %a_now%
  today += -1, days
  FormatTime, today, %today%, yyyy-MM-dd
  SendInput %today%
return
; insert snippet from file

:c*:newhtml::
  FileRead, Clipboard, C:\Users\Andrew\Documents\Rails\Code\snippets\newhtml.txt
  Send, ^v
Return

:c*:startupfolder::
  FileRead, Clipboard, C:\Users\Andrew\Documents\Rails\Code\snippets\startupfolder.txt
  Send, ^v
Return

!o::
  Send, {Right}
  FileRead, Clipboard, C:\Users\Andrew\Documents\Rails\Code\snippets\curly.txt
  Send, ^v
  Send, {Left}{Left}
  Send, {Enter}
Return
; quickly (hence usage of alt) insert some useful unicode characters
; should use BOM to make it correct, not sure

!a::
  Send, Δ ;{U+0394}
return

!s::
  Send, ﹍
return

!x::
  Send, º
return

!b::
  Send, ૪
return
; ~~~~~~~~~~~~~~~~~~~ move files to grandparent folder ~~~~~~~~~~~~~~~
^Up::
  files := Explorer_GetSelection()
  Loop, Parse, files, `n, `r
    file := A_LoopField
    StringGetPos, pos1, file, \, R
    p := SubStr(file, 1, pos1)

    StringGetPos, pos2, p, \, R
    path := SubStr(p, 1, pos2)

  Loop, Parse, files, `n, `r ; go through list of selected files
    FileMove, %A_LoopField%, %path%
  Return

  Explorer_GetSelection(hwnd="") {
    ; Author: Learning one
    hwnd := hwnd ? hwnd : WinExist("A")
    WinGetClass class, ahk_id %hwnd%
    if (class="CabinetWClass" or class="ExploreWClass" or class="Progman")
      for window in ComObjCreate("Shell.Application").Windows
        if (window.hwnd==hwnd)
      sel := window.Document.SelectedItems
    for item in sel
    ToReturn .= item.path "`n"
    return Trim(ToReturn,"`n")
}
; ~~~~~~~~~ Open latest file in folder ~~~~~~~~~~~~~~~~~~~
!v::
  asdfdf := "C:\Users\Andrew\Downloads"
  Loop, %asdfdf%\*.*
  {
  If (A_LoopFileTimeCreated>Rec)
    {
    FPath=%A_LoopFileFullPath%
    Rec=%A_LoopFileTimeCreated%
    }
  }
  Run, %Fpath%
Return
; open random file in the folder
Filearray := []
Loop, Files, C:\Users\Andrew\Documents\Rails\Code\snippets\*.*
  Filearray.push(A_LoopFileLongPath)
total := Filearray.MaxIndex()

!q::
    Random, number, 1, % total
  Run, % Filearray[number]
return
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
if WinExist("ahk_exe Code.exe")
  WinActivate, ahk_exe Code.exe
else
  Run C:\Users\Andrew\AppData\Local\Programs\Microsoft VS Code\Code.exe
Return

f8::
if WinExist("ahk_exe explorer.exe")
  WinActivate, ahk_exe explorer.exe
else
  Run explorer.exe
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
; switch window back
; ~~~~~~~~~~ use windows key to quickly switch to previous window
; ~~~~~~~~~~ toggle scrolllock to reload browser tab immediately after switching
*lwin::
;  GetKeyState, state, ScrollLock, T ; state will be 'D' if ScrollLock is on or 'U' if it is off
;  if ( state = "U" )
;  {
    Send !{Tab}
;  }
;  else
;  {
;    Send !{Tab}
;    Sleep, 100
;    if WinActive("ahk_exe chrome.exe")
;      Send {ctrl down}r{ctrl up}
;  }
Return
!h::
  Send {Left}
return

!j::
  Send {Down}
return

!k::
  Send {Up}
return

!l::
  Send {Right}
return

; not quite Vim shortcut, but...
!n::
  Send {End}
  Sleep, 100
  Send, {Enter}
return

; move 8 characters to the right
!;::
  Send, {Right}{Right}{Right}{Right}{Right}{Right}{Right}{Right}
return

; move 8 characters to the left
!g::
  Send, {Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left}
return

!'::
  Send, {End}
return

!e::
  Send, {Home}
return

; totally not Vim, and not even strictly speaking alt...
!+j::
  Send, ^{Backspace}
return
; ~~~~~~~~~~~~~~ Window Always on Top ~~~~~~~~~~~~~~~~~~~~~~~~~
!u::  Winset, Alwaysontop, , A
return
; ~~~~~ window transparency defined by mouse wheel ~~~~~~~~~~~~~~~~

OnExit EXITkio
^+WheelDown::
^+WheelUp::
Sleep 50
MouseGetPos cx, cy, Win_Id
WinGetClass Class, ahk_id %Win_Id%
If Class in Progman,Shell_TrayWnd
Return
IfEqual N%Win_Id%,, {
WinGet T, Transparent, ahk_id %Win_Id%
IfEqual T,, SetEnv T,255
List = %List%%Win_Id%,%T%,
N%Win_Id% = %T%
}
IfEqual A_ThisHotKey,^+WheelUp, EnvAdd N%Win_Id%,12
Else N%Win_Id% -= 12 ;Transparency changing step
IfGreater N%Win_Id%,255, SetEnv N%Win_Id%,255
IfLess N%Win_Id%,40, SetEnv N%Win_Id%,40
WinSet Transparent, % N%Win_Id%, ahk_id %Win_Id%
TrayTip,,% "Transparency: " N%Win_Id%
Return

EXITkio:
Loop Parse, List, `,
If (A_Index & 1)
Id = %A_LoopField%
Else
Winset Transparent, %A_LoopField%, ahk_id %Id%
ExitApp
