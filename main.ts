input.onButtonPressed(Button.A, function () {
    basic.showNumber(steps)
})
input.onGesture(Gesture.SixG, function () {
    radio.sendString("Fall")
    basic.showLeds(`
        . # . # .
        . . . . .
        . . . . .
        . # # # .
        # . . . #
        `)
    basic.pause(100)
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Response")
    basic.showLeds(`
        . # . # .
        . . . . .
        # . . . #
        . # . # .
        . . # . .
        `)
    basic.pause(100)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 30; index++) {
        if (input.acceleration(Dimension.Strength) > 1050) {
            parkinson += 1
        }
    }
    basic.pause(5000)
    if (parkinson < 10) {
        basic.showString("You are Healthy")
    } else {
        basic.showString("You have Parkinsons")
    }
    steps = 0
    parkinson = 0
})
let parkinson = 0
let steps = 0
radio.setGroup(58)
steps = 0
basic.forever(function () {
    if (input.acceleration(Dimension.Strength) > 1500) {
        steps += 1
        radio.sendNumber(steps)
    }
})
