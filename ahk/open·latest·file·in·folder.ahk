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
