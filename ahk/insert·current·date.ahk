; ~~~~~~~~~~~~~~ Insert Current Date ~~~~~~~~~~~~~~~~~~~~~~~~~~

!t::
  FormatTime, Time,, yyyy-MM-dd
  Send %Time%
Return

!y::
  today = %a_now%
  today += -1, days
  FormatTime, today, %today%, yyyy-MM-dd
  SendInput %today%
return
