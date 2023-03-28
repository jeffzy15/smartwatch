def on_button_pressed_a():
    basic.show_number(steps)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_six_g():
    radio.send_string("Fall")
    basic.show_leds("""
        . # . # .
                . . . . .
                . . . . .
                . # # # .
                # . . . #
    """)
    basic.pause(100)
    basic.clear_screen()
input.on_gesture(Gesture.SIX_G, on_gesture_six_g)

def on_button_pressed_ab():
    radio.send_string("Response")
    basic.show_leds("""
        . # . # .
                . . . . .
                # . . . #
                . # . # .
                . . # . .
    """)
    basic.pause(100)
    basic.clear_screen()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global parkinson, steps
    for index in range(30):
        if input.acceleration(Dimension.STRENGTH) > 1050:
            parkinson += 1
    basic.pause(5000)
    if parkinson < 10:
        basic.show_string("You are Healthy")
    else:
        basic.show_string("You have Parkinsons")
    steps = 0
    parkinson = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

parkinson = 0
steps = 0
radio.set_group(58)
steps = 0

def on_forever():
    global steps
    if input.acceleration(Dimension.STRENGTH) > 1500:
        steps += 1
        radio.send_number(steps)
basic.forever(on_forever)
