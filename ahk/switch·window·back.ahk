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
