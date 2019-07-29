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
