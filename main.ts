input.onButtonPressed(Button.A, function () {
    if (px > 0) {
        led.unplot(px, py)
        px += -1
    }
})
input.onButtonPressed(Button.AB, function () {
    shoot = 1
})
input.onButtonPressed(Button.B, function () {
    if (px < 4) {
        led.unplot(px, py)
        px += 1
    }
})
let acc = 0
let time = 0
let kiled: number[] = []
let enemyY: number[] = []
let enemyX: number[] = []
let shoot = 0
let py = 0
let px = 0
let ex = 0
px += 2
py = 4
let my = 3
shoot = 0
let speed = 50
for (let index = 0; index <= 4; index++) {
    enemyX[index] = randint(0, 4)
    enemyY[index] = index * -1
    kiled[index] = 0
}
basic.forever(function () {
    led.plotBrightness(px, py, 255)
    for (let index2 = 0; index2 <= 4; index2++) {
        if (kiled[index2] == 0) {
            led.unplot(enemyX[index2], enemyY[index2] - 1)
            led.plotBrightness(enemyX[index2], enemyY[index2], 255)
        }
    }
    if (shoot == 1) {
        led.plotBrightness(px, my, 51)
        for (let index3 = 0; index3 <= 4; index3++) {
            if (kiled[index3] == 0 && (px == enemyX[index3] && my == enemyY[index3])) {
                kiled[index3] = 1
            }
        }
        basic.pause(25)
        led.unplot(px, my)
        my += -1
    }
    if (time > speed) {
        time = 0
        acc += 1
        for (let index4 = 0; index4 <= 4; index4++) {
            enemyY[index4] = enemyY[index4] + 1
        }
    }
    if (my < 0) {
        shoot = 0
        my = 5
    }
    for (let index5 = 0; index5 <= 4; index5++) {
        if (kiled[index5] == 0) {
            if (enemyY[index5] > 4) {
                basic.showLeds(`
                    # . . . #
                    . # . # .
                    . . # . .
                    . # . # .
                    # . . . #
                    `)
                basic.pause(200)
                basic.clearScreen()
                basic.showString("score:")
                basic.showNumber(acc)
            }
        }
    }
    time += 1
    if (acc % 5 == 0) {
        speed += -3
        acc += 1
    }
    for (let index6 = 0; index6 <= 4; index6++) {
        if (enemyY[index6] > 4) {
            enemyY[index6] = -1
            enemyX[index6] = randint(0, 4)
            kiled[index6] = 0
        }
    }
})
