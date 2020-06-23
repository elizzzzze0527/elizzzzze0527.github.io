let counter = 0;
let answer = null;
let questions = [{
    question: "以下的水果你最喜歡那一種？",
    ans: ["馥郁的葡萄", "綿密的香蕉", "酸甜的草莓", "清新的柳橙"]
}, {
    question: "你喜歡怎樣的工作模式？",
    ans: ["用喜歡的音樂幫助集中", "跟朋友一邊聊天一邊工作", "一個人找一家有氣氛的咖啡廳坐下", "利用坐交通工具的時間"]
}, {
    question: "有一天你在路上發現一個紙箱<br>你認為裏面裝著的是甚麼？",
    ans: ["小貓", "手槍", "舊式電話", "甚麼也沒有"]
}, {
    question: "大熱天，你買了一杯冰淇淋<br>你會怎麼享用？",
    ans: ["用舌尖去舔", "大口咬下去", "用小湯匙去挖", "由餅乾開始吃起"]
}, {
    question: "你有一個室友，他今天吃完麵不洗碗<br>這時你會怎麼做？",
    ans: ["幫他洗碗", "催促他洗碗", "當沒事發生", "把他的碗摔在地上"]
}];

// -------------------------------------------------
//  HELPER FUNCTION
// -------------------------------------------------

function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, () => args[i++]);
}

// -------------------------------------------------
//  QUESTION TRANSITION
// -------------------------------------------------

function addMyListener() {
    $(document).ready(function() {
        $(".website-option").click(function() {
            ++counter;

            // -------------------------------------------------
            //  TRANSITION CRITERIA
            // -------------------------------------------------

            if (counter < questions.length) {
                $(".website-option").remove();
                $(".question").remove();
                $(".content").prepend(
                    parse("<div class='question col-xs-12'>%s</div>", questions[counter].question));
                for (x of questions[counter].ans) {
                    $(".website-options").append(parse("<div class='website-option'>%s</div>", x))
                }
                $(".question").css({ "text-align": "center", "font-size": "48pt", "color": "#ff5554" });
                $(".website-option").css({ "text-align": "center", "font-size": "48pt", "color": "#ffc801" });

                addMyListener();
            }

            // -------------------------------------------------
            //  END CRITERIA
            // -------------------------------------------------

            if (counter == questions.length) {
                $(".website-option").remove();
                $(".question").html("點此查看你的測驗結果。");

                $(document).ready(function() {
                    $(".question").click(function() {
                        let fruit = null;
                        answer = answer.slice(3);
                        if (answer === "葡萄") { fruit = "grape"; }
                        if (answer === "香蕉") { fruit = "banana"; }
                        if (answer === "柳橙") { fruit = "orange"; }
                        if (answer === "草莓") { fruit = "strawberry"; }
                        $(".question").html(parse("經過分析"));
                        $(".content").append(parse("<div class='image'><img src='./assets/%s.png'></div>", fruit));
                        $(".image").css({ "text-align": "center", "height": "300px" });
                        $("img").css({ "text-align": "center", "height": "100%" });
                        $(".content").append(parse("<div class='question'>證實你是一個喜歡%s的人。</div>", answer));
                        $(".question").css({ "text-align": "center", "font-size": "48pt", "color": "#ffc801" });
                    })
                })
            }
        });
    });
}

// -------------------------------------------------
//  START SECTION
// -------------------------------------------------

$(document).ready(function() {
    $(".start-button").click(function() {
        $(this).remove();
        $(".website-title").remove();
        $(".content").prepend(
            parse("<div class='question col-xs-12'>%s</div>", questions[counter].question));
        for (x of questions[counter].ans) {
            $(".website-options").append(parse("<div class='website-option critical'>%s</div>", x))
        }
        $(".question").css({ "text-align": "center", "font-size": "48pt", "color": "#ff5554" });
        $(".website-option").css({ "text-align": "center", "font-size": "48pt", "color": "#ffc801" });

        // -------------------------------------------------
        //  QUESTION START
        // -------------------------------------------------

        $(document).ready(function() {
            $(".critical").click(function(e) {
                answer = $(e.target).html();
                console.log(answer);
            })
        })

        addMyListener();
    });
})