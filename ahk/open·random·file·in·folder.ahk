; open random file in the folder
Filearray := []
Loop, Files, C:\Users\Andrew\Documents\Rails\Code\snippets\*.*
  Filearray.push(A_LoopFileLongPath)
total := Filearray.MaxIndex()

!q::
    Random, number, 1, % total
  Run, % Filearray[number]
return
