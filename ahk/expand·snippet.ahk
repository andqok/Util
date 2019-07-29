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
:c*:rt::return{Space}
:c*:tomkv::ls *.mp4|foreach{{}\ffmpeg.exe -i $_ $_.name.replace("mp4", "mkv"){}}
:c*:cutvideo::.\ffmpeg.exe -ss 00:00:00 -i "" -to 01:37:30 -c copy ""
; insert the content of clipboard
:c*:cb::
  Send, ^v
return
