function select(Element) {
    return document.querySelector(Element);
}

const clockSvg = select('.clockSvg');
const StopwatchSvg = select('.StopwatchSvg');
const TimerSvg = select('.TimerSvg');
const clock = select('.clock');
const stopwatch = select('.stopwatch');
const timer = select('.timer');

const PlaySvg = `<svg height='30px' width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffff"><path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path></svg>`
const pauseSvg = `<svg heigh='30px' width='30px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffff"><path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"></path></svg>`;
const crossSvg = `<svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffff"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>`;

let fields = [clock, stopwatch, timer];
function activeSection(initial1, hidden1, hidden2) {
    fields.forEach(field => {
        field.classList.remove('initial', 'hidden');
    });

    fields[0].classList.add(`${initial1}`);
    fields[1].classList.add(`${hidden1}`);
    fields[2].classList.add(`${hidden2}`);

}

function Clock() {

    const hourHand = select('#hour-hand');
    const minuteHand = select('#minute-hand');
    const second_Hand = select('#second-hand');
    const DocAMPM = select('.ampm');
    let lastSecond = 0;
    const TIme = select(".time")
    console.log(TIme)

    function getdate() {
        let now = new Date();
        let second = now.getSeconds();
        let minute = now.getMinutes();
        let hour = now.getHours();
        let secondDegree = (second / 60) * 360;
        let minuteDegree = ((minute + second / 60) / 60) * 360;
        let HourDegree = ((hour % 12 + minute / 60) / 12) * 360;


        if (lastSecond === 59 && second === 0) {
            second_Hand.style.transition = 'none'
        } else {
            second_Hand.style.transition = `all .05s cubic-bezier(0.07, 1.38, 0.37, 1.1)`;
        }

        lastSecond = second;
        second_Hand.style.transform = `rotate(${secondDegree}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
        hourHand.style.transform = `rotate(${HourDegree}deg)`;

    }

    setInterval(() => {
        getdate()
    }, 1000);

    const Hour = select('.hour');
    const minute = select('.minute');
    const second = select('.second');
    const ampm = select('.ampm');



    setInterval(() => {
        second.textContent = `: ${String(new Date().getSeconds()).padStart(2, '0')}`;
    }, 1000);
    let delaySeconds = (60 - new Date().getSeconds()) * 1000;
    const TwelveHour = 60 * 60 * 1000;
    function UpdateMH() {
        minute.textContent = `: ${String(new Date().getMinutes()).padStart(2, '0')}`;
        if (new Date().getHours() === 0) {
            Hour.textContent = `01`;
        } else if (new Date().getHours() % 12 === 0) {
            Hour.textContent = `12`;
        } else {
            Hour.textContent = `${String(new Date().getHours() % 12).padStart(2, '0')}`;
        }


        if (new Date().getHours() === 0 || new Date().getHours() < 12) {
            ampm.textContent = `AM`;
        } else {
            ampm.textContent = `PM`;
        }
    };


    function UpdateDate() {
        const daySpan = select('.day');
        const monthSpan = select('.month');
        const yearSpan = select('.year');
        let Day = new Date().getDate();
        let Months = ['January', 'February', 'March', 'April', "May", "June", "July", "August", "september", "October", "November", "December"];
        let Month = Months[new Date().getMonth()];
        let Year = new Date().getFullYear();
        console.log(Day, Month, Year)
        daySpan.textContent = Day;
        monthSpan.textContent = `${Month}`;
        yearSpan.textContent = `, ${Year}`;
    }
    UpdateMH();
    UpdateDate();
    setInterval(() => {
        UpdateMH();
    }, delaySeconds);
    setInterval(() => {
        UpdateDate();
    }, TwelveHour);




};


function Timer() {
    const ResetSvg = `<svg height="30px" width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffff"><path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 9.25022 5.38734 6.82447 7.50024 5.38451L7.5 8H9.5V2L3.5 2V4L5.99918 3.99989C3.57075 5.82434 2 8.72873 2 12Z"></path></svg>
`

    /* Creating input Number  */
    const InputNumbers = select('.inputNumbers');

    for (let i = 1; i <= 10; i++) {
        let Button = document.createElement('button');
        if (i === 10) {
            Button.textContent = `0`;
        } else {
            Button.textContent = i;
        }

        InputNumbers.appendChild(Button);
    }
    let cutButton = document.createElement('button');
    cutButton.innerHTML = `${crossSvg}`;
    cutButton.addEventListener("click", (e) => {
        e.stopPropagation();
        BackSpace();
    });

    InputNumbers.appendChild(cutButton);


    /* Start logic with userInputField */
    let ActiveSection = null;
    let isActive = false;


    const SecDiv = select('.Second span:nth-child(1n)');
    const MinuteDiv = select('.Minute span:nth-child(1n)');
    const HourDiv = select('.Hour span:nth-child(1n)');
    const AllNumbers = select('.inputNumbers');

    const AllTimeDiv = [HourDiv, MinuteDiv, SecDiv];
    const playElement = select('.play');
    const resetElement = select('.reset');
    let Play = false;
    let TimeInterval = null
    let Hour = 0;
    let Minute = 0;
    let Second = 0;
    let totalSeconds = 0;



    AllTimeDiv.forEach(TimeDiv => {
        TimeDiv.addEventListener('click', (Event) => {
            if (TimeDiv.getAttribute('disabled') === 'true') {
                showToast('Please stop the timer to change the time!');
                return
            };
            AllTimeDiv.forEach(blueRemoveDiv => {
                if (blueRemoveDiv.textContent === "") {
                    blueRemoveDiv.textContent = "00";
                }
                blueRemoveDiv.classList.remove('blue');
            });
            isActive = true;
            ActiveSection = null;
            ActiveSection = TimeDiv;
            ActiveSection.classList.add('blue');
            console.log(ActiveSection === AllTimeDiv[0] ? ActiveSection : 'null');
        })
    })

    /*Logic of inputNumbers */

    function showToast(message) {
        const toast = select('#toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000); // disappears after 2 seconds
    }
    function Buttonclick(propsValue) {
        if (!isActive) {
            alert('Please choose a time section!!')
            return false;
        }

        if (ActiveSection.textContent === "00") {
            ActiveSection.textContent = '';

        }

        let CurrentText = ActiveSection.textContent;
        if (CurrentText.length < 2) {
            ActiveSection.textContent += `${propsValue}`;
        };
    }

    function nextTab() {
        const currentIndex = AllTimeDiv.indexOf(ActiveSection);
        const nextIndex = (currentIndex + 1) % AllTimeDiv.length;
        ActiveSection.classList.remove('blue');
        ActiveSection = AllTimeDiv[nextIndex];
        ActiveSection.classList.add('blue');
    }

    function BackSpace() {
        if (!isActive) {
            alert('Please choose a time section!!')
            return;
        }
        if (ActiveSection.textContent === "00" || ActiveSection.textContent === "") return;

        ActiveSection.textContent = ActiveSection.textContent.slice(0, -1);

        if (ActiveSection.textContent === "") {
            ActiveSection.textContent = "00";
        }
    }

    function TogglePlay() {
        Play = !Play;
        if (Play) {
            AllTimeDiv.forEach(TimeDiv => {
                TimeDiv.setAttribute("disabled", "true");
            })
            TimeInterval = setInterval(() => {
                if (totalSeconds <= 0) {
                    clearInterval(TimeInterval);
                    Reset();
                    alert('Time is up!!');
                    return;
                }
                if (!Play) {
                    clearInterval(TimeInterval);
                    return;
                }
                totalSeconds--;
                Hour = Math.floor(totalSeconds / 3600);
                Minute = Math.floor((totalSeconds % 3600) / 60);
                Second = totalSeconds % 60;
                AllTimeDiv[0].textContent = Hour.toString().padStart(2, '0');
                AllTimeDiv[1].textContent = Minute.toString().padStart(2, '0');
                AllTimeDiv[2].textContent = Second.toString().padStart(2, '0');
            }, 1000);
        } else {
            AllTimeDiv.forEach(TimeDiv => {
                TimeDiv.removeAttribute("disabled");
            })
            clearInterval(TimeInterval);
        }
    }

    function PlayPauseBtn() {
        if (!isActive) {
            alert('choose a time section ')

            return false;
        }
        Hour = Number(AllTimeDiv[0].textContent);
        Minute = Number(AllTimeDiv[1].textContent);
        Second = Number(AllTimeDiv[2].textContent);
        totalSeconds = Hour * 3600 + Minute * 60 + Second;
        console.log(totalSeconds)
        console.log(Hour, Minute, Second)

        if (Hour === 0 && Minute === 0 && Second === 0) {
            alert('give the right input')
            return false;
        }

        TogglePlay();
        return true
    }

    function Reset() {
        Hour = 0;
        Minute = 0;
        Second = 0;
        totalSeconds = 0;
        Play = false;
        playElement.innerHTML = `${PlaySvg}`;
        AllTimeDiv.forEach(TimeDiv => {
            TimeDiv.textContent = "00";
            TimeDiv.removeAttribute("disabled");
            TimeDiv.classList.remove('blue');
        });
        isActive = false;
        clearInterval(TimeInterval);
    }

    /* Now the eventListeners for document  */

    AllNumbers.addEventListener('click', (eventObject) => {
        if (eventObject.target.tagName !== 'BUTTON') return;
        Buttonclick(eventObject.target.textContent);

    });



    /* Logic of key board buttons  */
    window.addEventListener('keydown', (autoEvent) => {
        autoEvent.preventDefault();
        if (Play) return;

        const Numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        Numbers.forEach(e => {
            if (e === autoEvent.key) {
                Buttonclick(e);
            }
        });
        if (isActive) {
            if (autoEvent.key === "Backspace") {
                BackSpace();
            }
            if (autoEvent.key === "Tab") {
                nextTab();
            }
        }
    })

    /* Stop watch play pause and reset button logic  */


    playElement.addEventListener('click', (autoE) => {
        const changed = PlayPauseBtn();
        if (changed) {
            AllTimeDiv.forEach(TimeDiv => {
                TimeDiv.classList.remove('blue');
            })
            if (Play) {
                playElement.innerHTML = `${pauseSvg}`;
            } else {
                playElement.innerHTML = `${PlaySvg}`;
            }
        }



    });
    resetElement.addEventListener('click', () => {
        const confirmReset = confirm('Are you sure you want to reset the timer?');
        if (!confirmReset) return;
        Reset();
    });
}


function StopWatch() {
    const HourDiv = select('.h');
    const minDiv = select('.m');
    const secDiv = select('.s');
    const MilleSecDiv = select('.me');
    const Res = select('.StopReset');
    console.log(MilleSecDiv);
    const PlayPause = select('.timer .palyPause');
    let Start = false;
    let TimesArray = [HourDiv, minDiv, secDiv, MilleSecDiv];
    let HourTick = 0;
    let minTick = 0;
    let secTick = 0;
    let MilleSecond = 0;
    let TimeInterval = null;
    let colorInterval = [];

    function OnPlay() {
        TimeInterval = setInterval(() => {
            MilleSecond++;
            if (minTick === 60) {
                HourTick++;
                minTick = 0;
            }
            if (secTick === 60) {
                minTick++;

                secTick = 0;
            }
            if (MilleSecond === 99) {
                secTick++;
                MilleSecond = 0;
                MilleSecDiv.textContent = '00';
            }

            MilleSecDiv.textContent = String(MilleSecond).padStart(2, '0');
            secDiv.textContent = String(secTick).padStart(2, '0');
            minDiv.textContent = String(minTick).padStart(2, '0');
            HourDiv.textContent = String(HourTick).padStart(2, '0');

        }, 10);
    }
    function OnPause() {
        clearInterval(TimeInterval);
        clearInterval(colorInterval);
    };
    function Blinking(value) {
        TimesArray.forEach((TimeDiv, index) => {
            if (value) {
                TimeDiv.classList.add('blinking');
                colorInterval[index] = setInterval(() => {
                    const randomColor = `rgb(
                ${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}
            )`;
                    TimeDiv.style.color = randomColor;
                }, 1000);
            } else {
                TimeDiv.classList.remove('blinking');
                clearInterval(colorInterval[index]);
                TimeDiv.style.color = '';
            }
        })
    }

    function restTime() {
        clearInterval(TimeInterval);
        colorInterval.forEach(interval => clearInterval(interval));
        colorInterval = [];
        HourTick = 0;
        minTick = 0;
        secTick = 0;
        MilleSecond = 0;
        Start = false;
        TimesArray.forEach(TimeDiv => {
            TimeDiv.textContent = `00`;
            TimeDiv.style.color = '';
        })
    }
    PlayPause.addEventListener('click', (autoObject) => {
        autoObject.preventDefault();
        console.log(autoObject);
        Start = !Start;
        if (Start) {
            PlayPause.innerHTML = `${pauseSvg}`;
            OnPlay();
            Blinking(false)
        }
        if (!Start) {
            PlayPause.innerHTML = `${PlaySvg}`;
            OnPause();
            Blinking(true);
        }
    });

    Res.addEventListener('click', (autoObject) => {
        autoObject.preventDefault();
        restTime();
        Blinking(false);
    });




};

Clock();
Timer();
StopWatch();
const Header = select('header');

clockSvg.addEventListener('click', () => {
    activeSection('initial', 'hidden', 'hidden');
});

StopwatchSvg.addEventListener('click', () => {
    activeSection('hidden', 'initial', 'hidden');
});

TimerSvg.addEventListener('click', () => {
    activeSection('hidden', 'hidden', 'initial');
});



