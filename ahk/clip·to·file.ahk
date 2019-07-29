; clipboard to file
!q::
  Send, ^c
  Sleep 300
  Fileappend,%clipboard%`r,C:\Users\Andrew\Documents\Rails\clip.txt,UTF-8
return
