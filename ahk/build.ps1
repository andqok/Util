cd C:\Users\Andrew\Documents\Rails\Code\AutoHotKey
Get-ChildItem -recurse -include "*.ahk" | % { Get-Content $_ -ReadCount 0 | Add-Content AutoHotKey.ahk }
