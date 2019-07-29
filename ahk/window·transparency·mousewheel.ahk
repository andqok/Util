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
