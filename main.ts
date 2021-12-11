input.onButtonPressed(Button.A, function () {
    start_bounce = true
    bouncing(1, 1, 100, 1)
})
function bouncing (xdir: number, ydir: number, delay: number, bounce_weight: number) {
    item = ydir
    while (start_bounce) {
        if (pdl_pos == ballX) {
            item = 0
            y_dir_change = -1
        } else if (pdl_pos + 1 == ballX) {
            item = 1
            padright += 1
            y_dir_change = 0
        } else if (pdl_pos - 1 == ballX) {
            item = -1
            padleft += 1
            y_dir_change = 1
        }
        if (xdir == 1) {
            xpos += x_dir_change
            if (xpos >= 15) {
                x_dir_change = -1
            } else if (xpos <= 0) {
                x_dir_change = 1
                music.playTone(880, music.beat(BeatFraction.Eighth))
            }
        }
        if (ydir == 1) {
            ypos += y_dir_change
            if (ypos >= 15) {
                y_dir_change = -1
            } else if (ypos <= 0) {
                y_dir_change = 1
            }
        }
        ballX = xpos
        ballY = ypos
        basic.pause(100)
        serial.writeNumbers([
        ballX,
        ballY,
        x_dir_change,
        y_dir_change,
        xpos,
        ypos,
        pdl_pos
        ])
    }
}
input.onButtonPressed(Button.AB, function () {
    padleft = 1
    padright = 1
})
input.onButtonPressed(Button.B, function () {
    start_bounce = false
})
radio.onReceivedValue(function (name, value) {
    if (name.includes("cursor")) {
        pdl_pos = Math.round(Math.map(value - Math.idiv(value, 10000) * 10000, 0, 4096, 15, 0))
        serial.writeValue(name, pdl_pos)
    }
})
let prev_ballY = 0
let prev_ballX = 0
let item = 0
let start_bounce = false
let padright = 0
let padleft = 0
let pdl_pos = 0
let y_dir_change = 0
let x_dir_change = 0
let ballY = 0
let ballX = 0
let ypos = 0
let xpos = 0
xpos = 8
ypos = 8
ballX = 8
ballY = 8
x_dir_change = 1
y_dir_change = 1
radio.setGroup(1)
serial.writeValue("x", pdl_pos)
let matrix = SmartMatrix.create(
DigitalPin.P1,
16,
16,
NeoPixelMode.RGB
)
matrix.Brightness(32)
let points = 3
padleft = 1
padright = 1
music.setVolume(33)
basic.forever(function () {
    matrix.clear()
    matrix.setPixel(prev_ballX, prev_ballY, neopixel.colors(NeoPixelColors.Black))
    matrix.setPixel(ballX, ballY, neopixel.colors(NeoPixelColors.Green))
    for (let index = 0; index <= padleft; index++) {
        matrix.setPixel(0, pdl_pos - 1, neopixel.colors(NeoPixelColors.Purple))
    }
    matrix.setPixel(0, pdl_pos, neopixel.colors(NeoPixelColors.Violet))
    for (let index = 0; index <= padright; index++) {
        matrix.setPixel(0, pdl_pos + 1, neopixel.colors(NeoPixelColors.Purple))
    }
    prev_ballX = ballX
    prev_ballY = ballY
    matrix.show()
    basic.pause(100)
})
