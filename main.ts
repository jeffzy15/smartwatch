enum RadioMessage {
    Fall = 16412,
    Response = 42258,
    message1 = 49434
}
input.onButtonPressed(Button.A, function () {
    basic.showNumber(steps)
})
input.onGesture(Gesture.SixG, function () {
    radio.sendMessage(RadioMessage.Fall)
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
    appointment()
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
input.onGesture(Gesture.Shake, function () {
    radio.sendMessage(RadioMessage.Response)
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
function appointment () {
    basic.showString("month")
    while (!(input.isGesture(Gesture.TiltLeft))) {
        timeanddate.numericTime(function (hour, minute, second, month, day, year) {
            if (input.isGesture(Gesture.TiltRight)) {
                timeanddate.setDate(month + 1, day, 2023)
                basic.showString(timeanddate.date(timeanddate.DateFormat.MD))
            }
        })
    }
    basic.showString("day")
    while (!(input.isGesture(Gesture.TiltLeft))) {
        timeanddate.numericTime(function (hour, minute, second, month, day, year) {
            if (input.isGesture(Gesture.TiltRight)) {
                timeanddate.setDate(month, day + 1, 2023)
                basic.showString(timeanddate.date(timeanddate.DateFormat.MD))
            }
        })
    }
    basic.showString("hr")
    while (!(input.isGesture(Gesture.TiltLeft))) {
        timeanddate.numericTime(function (hour, minute, second, month, day, year) {
            if (input.isGesture(Gesture.TiltRight)) {
                hour = 6
                timeanddate.set24HourTime(hour + 1, minute, 0)
                basic.showString(timeanddate.time(timeanddate.TimeFormat.HMMAMPM))
            }
        })
    }
    basic.showString("min")
    while (!(input.isGesture(Gesture.TiltLeft))) {
        timeanddate.numericTime(function (hour, minute, second, month, day, year) {
            if (input.isGesture(Gesture.TiltRight)) {
                minute = 29
                timeanddate.set24HourTime(hour, minute + 1, 0)
                basic.showString(timeanddate.time(timeanddate.TimeFormat.HMMAMPM))
            }
        })
    }
    basic.showString(timeanddate.dateTime())
}
let parkinson = 0
let steps = 0
radio.setGroup(58)
steps = 0
basic.forever(function () {
    if (input.acceleration(Dimension.Strength) > 1500) {
        steps += 1
        radio.sendNumber(steps)
    }
    radio.sendString(timeanddate.dateTime())
})
