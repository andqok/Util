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
