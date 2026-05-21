enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy
}
namespace SpriteKind {
    export const StartLine = SpriteKind.create()
}
function spawnSpeedo () {
    speedometer = textsprite.create("000")
    speedometer.setMaxFontHeight(12)
    speedometer.setOutline(2, 2)
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (carSpeed > 7) {
        carSpeed += -7
    }
    if (carSpeed <= 2) {
        scene.cameraShake(2, 100)
    }
    if (!(crashSoundPlayed)) {
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    }
    crashSoundPlayed = true
})
function accelerationSound () {
    if (accelerating && gearChange || accelerating && directionChange) {
        music.stopAllSounds()
        if (gear == 1) {
            music.play(music.createSoundEffect(WaveShape.Noise, 600, 4300, 50, 100, 5000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            playingSound = true
        } else if (gear == 2) {
            music.play(music.createSoundEffect(WaveShape.Noise, 800, 4300, 80, 110, 7000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            playingSound = true
        } else if (gear == 3) {
            music.play(music.createSoundEffect(WaveShape.Noise, 900, 4300, 90, 130, 9999, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            playingSound = true
        }
    }
}
function updateTimer () {
    if (timing) {
        if (seconds > 99) {
            timeText = "99.99+"
            timerX = 61
        } else if (seconds < 10) {
            timeText = "0" + convertToText(seconds) + "." + convertToText(tenths) + randint(0, 9)
            timerX = 64
        } else {
            timeText = "" + convertToText(seconds) + "." + convertToText(tenths) + randint(0, 9)
        }
        timer.setText(timeText)
    }
}
function rotateImg () {
    if (carAngle >= 11.25 * 31 || carAngle < 11.25 * 1) {
        carSprite.setImage(assets.image`car0`)
    } else if (carAngle >= 11.25 * 29) {
        carSprite.setImage(assets.image`car337`)
    } else if (carAngle >= 11.25 * 27) {
        carSprite.setImage(assets.image`car315`)
    } else if (carAngle >= 11.25 * 25) {
        carSprite.setImage(assets.image`car292`)
    } else if (carAngle >= 11.25 * 23) {
        carSprite.setImage(assets.image`car270`)
    } else if (carAngle >= 11.25 * 21) {
        carSprite.setImage(assets.image`car247`)
    } else if (carAngle >= 11.25 * 19) {
        carSprite.setImage(assets.image`car225`)
    } else if (carAngle >= 11.25 * 17) {
        carSprite.setImage(assets.image`car202`)
    } else if (carAngle >= 11.25 * 15) {
        carSprite.setImage(assets.image`car180`)
    } else if (carAngle >= 11.25 * 13) {
        carSprite.setImage(assets.image`car157`)
    } else if (carAngle >= 11.25 * 11) {
        carSprite.setImage(assets.image`car135`)
    } else if (carAngle >= 11.25 * 9) {
        carSprite.setImage(assets.image`car112`)
    } else if (carAngle >= 11.25 * 7) {
        carSprite.setImage(assets.image`car90`)
    } else if (carAngle >= 11.25 * 5) {
        carSprite.setImage(assets.image`car67`)
    } else if (carAngle >= 11.25 * 3) {
        carSprite.setImage(assets.image`car45`)
    } else if (carAngle >= 11.25 * 1) {
        carSprite.setImage(assets.image`car22`)
    }
}
function setGear () {
    if (carSpeed >= 0.6 && carSpeed <= 70) {
        gear = 1
    } else if (carSpeed > 70 && carSpeed <= 110) {
        gear = 2
    } else if (carSpeed > 110 && carSpeed <= 150) {
        gear = 3
    } else if (carSpeed < 0.6) {
        gear = 0
        carSpeed = 0
        music.stopAllSounds()
        playingSound = false
    }
    accelerating = carSpeed > lastSpeed
    decelerating = carSpeed < lastSpeed
    gearChange = gear != lastGear
    if (wasAccelerating == accelerating) {
        directionChange = false
    } else {
        directionChange = true
    }
}
function decelerationSound () {
    if (decelerating && gearChange || decelerating && directionChange) {
        music.stopAllSounds()
        if (gear == 1) {
            music.play(music.createSoundEffect(WaveShape.Noise, 4000, 600, 100, 50, 3000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            playingSound = true
        } else if (gear == 2) {
            music.play(music.createSoundEffect(WaveShape.Noise, 4000, 800, 110, 80, 3000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            playingSound = true
        } else if (gear == 3) {
            music.play(music.createSoundEffect(WaveShape.Noise, 4000, 900, 130, 90, 4000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            playingSound = true
        }
    }
}
function updateSpeed () {
    if (controller.A.isPressed()) {
        if (carSpeed < 30) {
            carSpeed += 0.7
        } else if (carSpeed < 60) {
            carSpeed += 0.5
        } else if (carSpeed >= 60) {
            carSpeed += 0.3
        }
    }
    if (!(controller.A.isPressed()) && carSpeed > 0.3) {
        carSpeed += -0.3
    }
    if (controller.B.isPressed() && carSpeed > 1.3) {
        carSpeed += -1.3
    }
    wasAccelerating = accelerating
    setGear()
    accelerationSound()
    decelerationSound()
    lastSpeed = carSpeed
    lastGear = gear
}
function moveCar () {
    carSpeedX = Math.cos((carAngle - 90) * 3.14159265359 / 180) * carSpeed
    carSprite.vx = carSpeedX
    carSpeedY = Math.sin((carAngle - 90) * 3.14159265359 / 180) * carSpeed
    carSprite.vy = carSpeedY
}
function convertToText2 (lapTime: number, lapHundredths: number) {
    if (lapHundredths < 10) {
        return "" + convertToText(lapTime).substr(0, 2) + "." + ("" + convertToText(lapTime).substr(3, 1) + convertToText(lapHundredths))
    } else {
        return "" + convertToText(lapTime).substr(0, 2) + "." + ("" + convertToText(lapTime).substr(3, 2))
    }
}
function spawnCarSprite () {
    carSprite = sprites.create(assets.image`car90`, SpriteKind.Player)
    carSprite.setBounceOnWall(true)
    carSpeed = 0
    carAngle = 90
    carSprite.setPosition(232, 169)
    sector = 0
    timing = false
    lapNum = 1
}
function checkCheckPoints () {
    carLocation = carSprite.tilemapLocation()
    if (sector != 2 && (carLocation.column == 19 && carLocation.row == 10 || carLocation.column == 19 && carLocation.row == 11)) {
        if (timing && sector == 3) {
            addLap()
            carSprite.startEffect(effects.confetti, 500)
            seconds = 0
            tenths = 0
        } else if (sector == 0) {
            timing = true
        }
        sector = 1
    } else if (sector == 1 && (carLocation.column == 41 && carLocation.row == 31 || carLocation.column == 42 && carLocation.row == 31)) {
        sector = 2
    } else if (sector == 2 && (carLocation.column == 21 && carLocation.row == 24 || carLocation.column == 22 && carLocation.row == 24)) {
        sector = 3
    }
    if (sector == 1 && (carLocation.column == 17 && carLocation.row == 10 || carLocation.column == 17 && carLocation.row == 11)) {
        sector = 0
        carSprite.sayText("Wrong way!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else if (sector == 2 && (carLocation.column == 41 && carLocation.row == 29 || carLocation.column == 42 && carLocation.row == 29)) {
        sector = 1
        carSprite.sayText("Wrong way!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else if (sector == 3 && (carLocation.column == 21 && carLocation.row == 26 || carLocation.column == 22 && carLocation.row == 26)) {
        sector = 2
        carSprite.sayText("Wrong way!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
}
function spawnTimer () {
    timer = textsprite.create("00.00")
    timer.setMaxFontHeight(8)
    timer.setOutline(1, 2)
    seconds = 0
    tenths = 0
    timerX = 64
}
function addLap () {
    lapTime = seconds + tenths / 10
    if (lapTime > 99) {
        carSprite.sayText("Lap " + lapNum + ":\\n" + ("Too slow," + "\\ntry again" + "!"), 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        carSprite.startEffect(effects.confetti, 500)
        if (lapNum == 1) {
            lap1 = lapTime
            lap1Hundredths = randint(0, 9)
            lap1Text = convertToText2(lap1, lap1Hundredths)
            carSprite.sayText("Lap " + lapNum + ":\\n" + ("" + lap1Text + "!"), 2000, false)
        } else if (lapNum == 2) {
            lap2 = lapTime
            lap2Hundredths = randint(0, 9)
            lap2Text = convertToText2(lap2, lap2Hundredths)
            carSprite.sayText("Lap " + lapNum + ":\\n" + ("" + lap2Text + "!"), 2000, false)
        } else if (lapNum == 3) {
            music.stopAllSounds()
            music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
            lap3 = lapTime
            lap3Hundredths = randint(0, 9)
            lap3Text = convertToText2(lap3, lap3Hundredths)
            averageLapTime = (lap1 + (lap2 + lap3)) / lapNum
            game.showLongText("Lap 1: " + lap1Text + "\\nLap 2: " + lap2Text + "\\nLap 3: " + lap3Text + "\\n---------------" + "\\nAverage: " + convertToText2(averageLapTime, 10) + "\\nTop Speed: " + Math.round(topSpeed * 1.5), DialogLayout.Center)
            game.reset()
        }
        lapNum += 1
    }
}
function updateAngle () {
    if (controller.left.isPressed() && carSpeed > 4) {
        if (carAngle <= 0) {
            carAngle = 359
        } else {
            carAngle += -3
        }
    }
    if (controller.right.isPressed() && carSpeed > 4) {
        if (carAngle >= 360) {
            carAngle = 0
        } else {
            carAngle += 3
        }
    }
}
function updateSpeedo () {
    displaySpeed = Math.round(carSpeed * 1.5)
    if (displaySpeed < 10) {
        speedText = "00" + convertToText(displaySpeed)
    } else if (displaySpeed < 100) {
        speedText = "0" + convertToText(displaySpeed)
    } else {
        speedText = convertToText(displaySpeed)
    }
    speedometer.setText(speedText)
}
let timeLagged = 0
let speedText = ""
let displaySpeed = 0
let averageLapTime = 0
let lap3Text = ""
let lap3Hundredths = 0
let lap3 = 0
let lap2Text = ""
let lap2Hundredths = 0
let lap2 = 0
let lap1Text = ""
let lap1Hundredths = 0
let lap1 = 0
let lapTime = 0
let carLocation: tiles.Location = null
let lapNum = 0
let sector = 0
let carSpeedY = 0
let carSpeedX = 0
let wasAccelerating = false
let lastGear = 0
let decelerating = false
let lastSpeed = 0
let carSprite: Sprite = null
let carAngle = 0
let timer: TextSprite = null
let tenths = 0
let timerX = 0
let timeText = ""
let seconds = 0
let timing = false
let playingSound = false
let gear = 0
let directionChange = false
let gearChange = false
let accelerating = false
let crashSoundPlayed = false
let carSpeed = 0
let speedometer: TextSprite = null
let topSpeed = 0
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`circuit01 modified`)
spawnSpeedo()
spawnCarSprite()
spawnTimer()
let secretTimer = 0
topSpeed = 0
game.showLongText("- Left and right to steer" + "\\n- A to accelerate" + "\\n- B to brake" + "\\n---------------" + "\\nYou get 3 laps!", DialogLayout.Full)
game.onUpdate(function () {
    rotateImg()
    updateAngle()
    updateSpeed()
    moveCar()
    scene.centerCameraAt(carSprite.x + carSprite.vx / 3, carSprite.y + carSprite.vy / 4)
    speedometer.setPosition(scene.cameraProperty(CameraProperty.X) + 63, scene.cameraProperty(CameraProperty.Y) + 52)
    timer.setPosition(scene.cameraProperty(CameraProperty.X) - timerX, scene.cameraProperty(CameraProperty.Y) - 55)
    checkCheckPoints()
    updateTimer()
    if (carSpeed > topSpeed) {
        topSpeed = carSpeed
    }
})
game.onUpdateInterval(1000, function () {
    carLocation = carSprite.tilemapLocation()
    if (carLocation.column == 11 && carLocation.row == 12 || carLocation.column == 11 && carLocation.row == 13) {
        secretTimer += 1
    }
    if (secretTimer == 4) {
        tiles.setTileAt(tiles.getTileLocation(11, 12), assets.tile`topLeftDiagonalFiller`)
        tiles.setTileAt(tiles.getTileLocation(11, 13), assets.tile`bottomLeftDiagonalFiller`)
        tiles.setWallAt(tiles.getTileLocation(10, 12), false)
        tiles.setWallAt(tiles.getTileLocation(10, 13), false)
    }
})
game.onUpdateInterval(1000, function () {
    if (crashSoundPlayed) {
        crashSoundPlayed = false
    }
})
game.onUpdateInterval(1000, function () {
    if (timing) {
        seconds += 1
    }
})
game.onUpdateInterval(100, function () {
    updateSpeedo()
})
game.onUpdateInterval(100, function () {
    if (timing) {
        if (seconds > timeLagged) {
            tenths = 0
            timeLagged = seconds
        }
        tenths += 1
        if (tenths > 9) {
            tenths = 0
        }
    }
})
