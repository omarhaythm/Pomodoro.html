$(document).ready(function() {
    let studyTime = 35 * 60;  // 35 minutes in seconds
    let breakTime = 5 * 60;   // 5 minutes in seconds
    let time = studyTime;
    let isRunning = false;
    let interval;

    function updateTimer() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        $('#timer').text(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }

    function startStudyTimer() {
        if (!isRunning) {
            isRunning = true;
            $('button').hide(); // إخفاء جميع الأزرار عند بدء الدراسة
            interval = setInterval(() => {
                time--;
                updateTimer();
                if (time === 0) {
                    clearInterval(interval);
                    isRunning = false;
                    $('#startBreakBtn').show();  // إظهار زر الاستراحة
                    alert("وقت الاستراحة!");
                }
            }, 1000);
        }
    }

    function startBreakTimer() {
        if (!isRunning) {
            time = breakTime;
            isRunning = true;
            $('#startBreakBtn').hide();  // إخفاء زر الاستراحة عند بدء الاستراحة
            interval = setInterval(() => {
                time--;
                updateTimer();
                if (time === 0) {
                    clearInterval(interval);
                    isRunning = false;
                    $('#startStudyBtn').show();  // إظهار زر البدء للدراسة مجددًا
                    $('#resetBtn').show();  // إظهار زر إعادة الضبط
                    time = studyTime;  // إعادة ضبط الوقت للدراسة
                    alert("انتهت الاستراحة! يمكنك البدء في الدراسة مجددًا.");
                }
            }, 1000);
        }
    }

    $('#startStudyBtn').click(startStudyTimer);

    $('#startBreakBtn').click(startBreakTimer);

    $('#resetBtn').click(function() {
        clearInterval(interval);
        time = studyTime;
        isRunning = false;
        updateTimer();
        $('#startStudyBtn').show();  // إظهار زر البدء بعد إعادة الضبط
        $('#resetBtn').show();
        $('#startBreakBtn').hide();
    });

    updateTimer();
});
