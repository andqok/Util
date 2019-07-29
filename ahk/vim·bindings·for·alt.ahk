!h::
  Send {Left}
return

!j::
  Send {Down}
return

!k::
  Send {Up}
return

!l::
  Send {Right}
return

; not quite Vim shortcut, but...
!n::
  Send {End}
  Sleep, 100
  Send, {Enter}
return

; move 8 characters to the right
!;::
  Send, {Right}{Right}{Right}{Right}{Right}{Right}{Right}{Right}
return

; move 8 characters to the left
!g::
  Send, {Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left}{Left}
return

!'::
  Send, {End}
return

!e::
  Send, {Home}
return

; totally not Vim, and not even strictly speaking alt...
!+j::
  Send, ^{Backspace}
return
