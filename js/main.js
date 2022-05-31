
const mmaContainer = document.getElementById('mma')
const secondaryContainer = document.getElementById('secondaryMMA')
const iPhoneImage = secondaryContainer.getElementsByClassName('animatedImage')[0]

/**
 * Calculates the ratio of completion.
 * */
function getPhoneRatio(scrollTop, min, max){
    const relativeScroll = scrollTop - min
    const relativeMax = max - min

    if (relativeScroll <= 0) {
    return 0
    }
    else if (relativeScroll > relativeMax) {
    return 1
    } else {
    return relativeScroll / relativeMax
    }
}

function getPhonePosLeft(scrollTop, min, max){
    const ratio = getPhoneRatio(scrollTop, min, max )
    if (ratio == 0){
    return 0
    } else {
    const temp = Math.round(ratio * 16)
    return temp * 6.25
    }
}

function getPhoneBackgroundPosition(scrollTop, min, max){
    const bgPositionLeft = getPhonePosLeft(scrollTop, min, max);
    return `${bgPositionLeft}% center`
}

function scrollHandler(e){
    const scrollTop = e.target.documentElement['scrollTop']
    if ( scrollTop > secondaryContainer.offsetTop ) {
    mmaContainer.classList.add('unlock');
    } else {
    mmaContainer.classList.remove('unlock');
    }
    const bgPos = getPhoneBackgroundPosition(scrollTop, 0, secondaryContainer.offsetTop);
    iPhoneImage.style.backgroundPosition = bgPos
}

window.onscroll = scrollHandler