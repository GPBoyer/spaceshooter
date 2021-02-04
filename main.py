def on_button_pressed_a():
    global px
    if px > 0:
        led.unplot(px, py)
        px += -1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global shoot
    shoot = 1
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global px
    if px < 4:
        led.unplot(px, py)
        px += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

kiled: List[number] = []
enemyY: List[number] = []
enemyX: List[number] = []
shoot = 0
py = 0
px = 0
px += 2
py = 4
my = 3
shoot = 0
ex = 0
time = 0
speed = 50
acc = 0
for index in range(5):
    enemyX[index] = randint(0, 4)
    enemyY[index] = index * -1
    kiled[index] = 0

def on_forever():
    global my, time, acc, shoot, speed
    led.plot_brightness(px, py, 255)
    for index2 in range(5):
        if kiled[index2] == 0:
            led.unplot(enemyX[index2], enemyY[index2] - 1)
            led.plot_brightness(enemyX[index2], enemyY[index2], 255)
    if shoot == 1:
        led.plot_brightness(px, my, 51)
        for index3 in range(5):
            if kiled[index3] == 0 and (px == enemyX[index3] and my == enemyY[index3]):
                kiled[index3] = 1
        basic.pause(25)
        led.unplot(px, my)
        my += -1
    if time > speed:
        time = 0
        acc += 1
        for index4 in range(5):
            enemyY[index4] = enemyY[index4] + 1
    if my < 0:
        shoot = 0
        my = 5
    for index5 in range(5):
        if kiled[index5] == 0:
            if enemyY[index5] > 4:
                basic.show_leds("""
                    # . . . #
                    . # . # .
                    . . # . .
                    . # . # .
                    # . . . #
                    """)
                basic.pause(200)
                basic.clear_screen()
                basic.show_string("score:")
                basic.show_number(acc)
    time += 1
    if acc % 5 == 0:
        speed += -3
        acc += 1
    for index6 in range(5):
        if enemyY[index6] > 4:
            enemyY[index6] = -1
            enemyX[index6] = randint(0, 4)
            kiled[index6] = 0
basic.forever(on_forever)
