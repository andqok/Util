# Util
Vanilla coding always requires low-level code to be abstracted away.
Examples: 

```js
dom.render(`
div.games-div
    div.games-div-inputs
        h2 text=Games
        div
            label text=game
            input.insert-game
        div
            label text=date
            input.game-date
        div
            label text=minutes
            input.game-minutes
        div
            button.game-submit text=submit
    img.game-image
    ul.prev-game-days
`, document.body)
```
