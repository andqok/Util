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
