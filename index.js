class Timer{
    constructor(minuteInput, secondeInput,  startButton, pauseButton, callback){
        this.minuteInput = minuteInput;
        this.secondeInput = secondeInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callback) {
            this.onStart = callback.onStart
            this.onTick = callback.onTick
        }
        if(localStorage.getItem('lastTickAt'))
        {
            this.timeRemain = Math.floor(localStorage.getItem('timer') -  (  Date.now() - localStorage.getItem('lastTickAt')  )/1000) 
        }else if (localStorage.getItem('timer')){
            this.timeRemain = localStorage.getItem('timer')
        }

        if (localStorage.getItem('run')) {
            this.start()
        }


        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    };

    start = () => {
        if (this.interval) {
            console.log('le timer est deja en route ')
        }
        else{
            this.tick()
            this.interval = setInterval(this.tick,1000)
            localStorage.setItem('run', true)
            if (this.onStart) {
                this.onStart()
            }
            delete this.pauseAt
        }

    }

    pause = () => {
        clearInterval(this.interval)
        delete this.interval
        localStorage.removeItem('run')
        localStorage.removeItem('lastTickAt')
    }
    tick = () => {
        localStorage.setItem('timer', this.timeRemain)
        localStorage.setItem('lastTickAt' , Date.now())
        this.timeRemain>0 ? this.timeRemain-- : this.reset()
        if (this.onTick) {
            this.onTick()
        }
    }

    reset = () => {
        localStorage.clear() 
        clearInterval(this.interval)

        delete this.interval
    }

    get timeRemain() {
        return Math.floor( this.minuteInput.value*60 ) + Math.floor(this.secondeInput.value )
    }

    set timeRemain(time) {
        this.minuteInput.value = String( Math.floor( time/60 )  ).padStart(2, '0')
        this.secondeInput.value = String( time%60 ).padStart(2, '0')
    }



}

const minuteInput = document.querySelector('#minute');
const secondeInput = document.querySelector('#seconde');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');


console.log(minuteInput)
const timer = new Timer(minuteInput, secondeInput,  startButton, pauseButton, {
    onStart(){
        console.log('onStart commence')
    },
    onTick(){
        console.log('ca tick')
    },

});

var increments = document.getElementsByClassName('ctrl-increment')
var i
for ( i=0; i < increments.length ; i++){
    increments[i].addEventListener('click', function increment(){
        this.nextElementSibling.value= String(parseInt( this.nextElementSibling.value )+1).padStart(2, '0')
    })
}

var decrements = document.getElementsByClassName('ctrl-decrement')
var i
for ( i=0; i < decrements.length ; i++){
    decrements[i].addEventListener('click', function decrement(){
        this.previousElementSibling.value= String(this.previousElementSibling.value-1).padStart(2, '0')
    })
}

