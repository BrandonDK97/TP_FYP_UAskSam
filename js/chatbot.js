//Dialogflow baseURL
var baseUrl = "https://api.dialogflow.com/v1/";
//gcloud access key
var APIKEY = "AIzaSyCzYDr-WRn_emBUZAegxbaWFijNPpsHYY8";
//dialogflow agents accessTokens
var mainAccessToken = "133d4781bf3d4640b1e82597e84f6b00";
//TP API KEY = "a528da7c6ac84045bf587b55f9d20124";
//API Key for dashbot
var DBKEY = "fmMKdgQ9EHOyRRJ699bk1IkuH6Iphqxjqqv6tmZt";

//Conversation phrase
var conversation = [];
//Idle timer start
var idleTime = 0;

//Intent Categories

var finalIntentCat;

var DefaultAnswerArry = ["Default Exclusion Intent",
    "Default Goodbye Intent",
    "Default Welcome Intent"
];

var DefaultFallbackArry = "Default Fallback Intent";

var EmploymentActArry = ["CheckEmploymentAct",
    "CheckEmploymentAct - NotCovered",
    "CheckEmploymentAct - NTUCMember",
    "CheckEmploymentAct - NotNTUCMember",
    "CheckEmploymentAct - Covered",
    "CheckEmploymentAct - PartIVCovered",
    "CheckEmploymentAct - PartIVNotCovered"
];

var LeaveArry = ["LeaveGeneral",
    "LeaveAnnual",
    "LeaveEarned",
    "LeaveGeneral",
    "LeaveOffset",
    "LeaveSick",
    "LeaveUnpaid",
    "LeaveEarned - Covered",
    "LeaveEarned - NotCovered",
    "LeaveSick - Medical Claims"
];

var ChildLeaveArry = ["LeaveChildGroup",
    "LeaveChildGroup - Father",
    "LeaveChildGroup - Father - Childcare Leave",
    "LeaveChildGroup - Father - Adoption Leave",
    "LeaveChildGroup - Father - Paternity Leave",
    "LeaveChildGroup - Father - Shared Parental Leave",
    "LeaveChildGroup - Father - Unpaid Infant Care Leave",
    "LeaveChildGroup - Mother",
    "LeaveChildGroup - Mother - Childcare Leave",
    "LeaveChildGroup - Mother - Adoption Leave",
    "LeaveChildGroup - Mother - Maternity Leave",
    "LeaveChildGroup - Mother - Unpaid Infant Care Leave"
];

var SalaryArry = ["SalaryCommission",
    "SalaryDeduction",
    "SalaryFinalPaying",
    "SalaryGeneral",
    "SalaryOvertime",
    "SalaryPaySlip",
    "SalaryWageComponents",
    "SalaryForeignWorker",
    "SalaryPublicHoliday"
];

var SalaryCalculateArry = ["SalaryCalculate",
    "SalaryCalculate - IncompleteMonth",
    "SalaryCalculate - PublicHoliday",
    "SalaryCalculate - Overtime",
    "SalaryCalculate - BasicPay",
    "SalaryCalculate - RestDay"
];

var WorkplaceGrievanceArry = ["WorkplaceGrievance",
    "WorkplaceGrievance - TerminationGeneral",
    "WorkplaceGrievance - ContractOfService",
    "WorkplaceGrievance - DismissalGeneral",
    "WorkplaceGrievance - RetrenchmentGeneral",
    "WorkplaceGrievance - TerminationGeneral - WithNotice",
    "WorkplaceGrievance - TerminationGeneral - WithoutNotice",
    "WorkplaceGrievance - TerminationGeneral - Misconduct",
    "WorkplaceGrievance - DismissalGeneral - UnfairDismissal",
    "WorkplaceGrievance - DismissalGeneral - PregnancyDismissal",
    "WorkplaceGrievance - RetrenchmentGeneral - UnfairRetrenchment",
    "WorkplaceGrievance - ContractOfService - Clause"
];

var WorkAdvisoryArry = ["WorkAdvisoryLink",
    "WorkAdvisoryLink - NotNTUCMember",
    "WorkAdvisoryLink - NTUCMember"
];

//counter for sessionStorage
var sessStorageCount = 0;

//Session ID Generator for reference
var uuid = guid();
//Session ID Function
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

sessId = sessGen();

function sessGen() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4();
};

//chat conversation flow things
var isWebkit = ('WebkitAppearance' in document.documentElement.style);
var isEdge = ('-ms-accelerator' in document.documentElement.style);


//Scroll function
function updateScroll(el) {
    el.scrollTop = el.scrollHeight;
};
//Scroll function
function scrollAtBottom(el) {
    return (el.scrollTop + 5 >= (el.scrollHeight - el.offsetHeight));
};

//Main function
$(document).ready(function () {
    $("#input").keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            send();
        }
    });
});

//Send text
function setInput(text) {
    $("#input").val(text);
    send();
};
//Send button click
function setInputBtn() {
    var value = document.getElementById('input').value;
    send();
};

function checkIntentCat(intentName) {
    for (i = 0; i < EmploymentActArry.length; i++) {
        if (intentName == EmploymentActArry[i]) {
            finalIntentCat = "Employment Act";
        };
    };
    for (i = 0; i < DefaultAnswerArry.length; i++) {
        if (intentName == DefaultAnswerArry[i]) {
            finalIntentCat = "Default Answer";
        };
    };
    for (i = 0; i < ChildLeaveArry.length; i++) {
        if (intentName == ChildLeaveArry[i]) {
            finalIntentCat = "Child Leave";
        };
    };
    for (i = 0; i < LeaveArry.length; i++) {
        if (intentName == LeaveArry[i]) {
            finalIntentCat = "General Leave";
        };
    };
    for (i = 0; i < SalaryArry.length; i++) {
        if (intentName == SalaryArry[i]) {
            finalIntentCat = "General Salary";
        };
    };
    for (i = 0; i < SalaryCalculateArry.length; i++) {
        if (intentName == SalaryCalculateArry[i]) {
            finalIntentCat = "Calculate Salary";
        };
    };
    for (i = 0; i < WorkAdvisoryArry.length; i++) {
        if (intentName == WorkAdvisoryArry[i]) {
            finalIntentCat = "Work Advisory";
        };
    };
    for (i = 0; i < WorkplaceGrievanceArry.length; i++) {
        if (intentName == WorkplaceGrievanceArry[i]) {
            finalIntentCat = "Workplace Grievance";
        };
    };
    if (intentName == DefaultFallbackArry) {
        finalIntentCat = "Default Fallback";
    };
}

//Implementation of Dashboard.io (Inbound)
function DBAnalysisInbound(text, intent, dFJson) {
    var platform = "";
    if (screen.height <= 812 && screen.width <= 414) {
        platform = "Mobile";
    } else {
        platform = "Web";
    }
    var text = text;
    //Checking for intent cat
    finalIntentCat = intent;
    checkIntentCat(finalIntentCat);
    var dFJson = dFJson;
    var nlpreq = new XMLHttpRequest();
    nlpreq.open("POST", "https://tracker.dashbot.io/track?platform=generic&v=9.4.0-rest&type=incoming&apiKey=" + DBKEY, true);

    nlpreq.setRequestHeader("Content-type", "application/json; charset=utf-8");
    var request = {
        text: text,
        userId: "User (" + sessId + ")",
        conversationId: platform + "Chat " + "(" + sessId + ")",
        intent: {
            name: finalIntentCat,
            inputs: {
                input: {
                    name: "Reply",
                    value: finalIntentCat
                }
            }
        },
        platformJSON: {
            Dialogflow: dFJson
        }
    };
    nlpreq.send(JSON.stringify(request));

    nlpreq.onreadystatechange = function () {
        if (nlpreq.readyState === 4 && nlpreq.status === 200) {}
    }
};

//Implementation of Dashboard.io (Outbound)
function DBAnalysisOutbound(text) {
    var platform = "";
    if (screen.height <= 812 && screen.width <= 414) {
        platform = "Mobile";
    } else {
        platform = "Web";
    }
    var text = text;
    var nlpreq = new XMLHttpRequest();
    setTimeout(function () {
        nlpreq.open("POST", "https://tracker.dashbot.io/track?platform=generic&v=9.4.0-rest&type=outgoing&apiKey=" + DBKEY, true);
        nlpreq.setRequestHeader("Content-type", "application/json; charset=utf-8");
        var request = {
            text: text,
            userId: "Bot",
            conversationId: platform + "Chat " + "(" + sessId + ")"
        };
        nlpreq.send(JSON.stringify(request));
    }, 3000);

    nlpreq.onreadystatechange = function () {
        if (nlpreq.readyState === 4 && nlpreq.status === 200) {}
    }
};

function SendAPI() {
    var username = "chatbot";
    var password = "chatbot";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        url: "https://apigwuat.ntuc.org.sg:8443/membership/details/S9722591E",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic" + btoa(username + ":" + password));
        },
        success: function (data) {
            console.log("Request sent");
        }
    })
};

//Implementation of Google Natural Language API
var sadCounter = 0;
//Analyze sentiment
function analyzeSentiment() {
    var text = document.getElementById("input").value;
    var nlpreq = new XMLHttpRequest();
    nlpreq.open("POST", "https://language.googleapis.com/v1beta1/documents:analyzeSentiment?key=" + APIKEY, true);

    nlpreq.setRequestHeader("Content-type", "application/json; charset=utf-8");

    var request = {
        document: {
            type: "PLAIN_TEXT",
            content: text
        },
        encodingType: "UTF8"
    };
    nlpreq.send(JSON.stringify(request));

    nlpreq.onreadystatechange = function () {
        if (nlpreq.readyState === 4 && nlpreq.status === 200) {

            response = JSON.parse(nlpreq.responseText);

            docSentiment = parseFloat(response['documentSentiment']['score']);
            docMagnitude = parseFloat(response['documentSentiment']['magnitude']);

            console.log("sentiment value:" + docSentiment);
            console.log("magnitude value:" + docMagnitude);

            if (docSentiment <= -0.7 && docMagnitude >= 0.4) {
                //Extreme case
                var redirect = "We hear you. Would you like to speak with one of our work advisory agents? Click <a href='#' id='sentimentAngery' onclick='optionSelect(this);' value='Write an appeal to NTUC' >here</a> to share details with us and we will get back to you as soon as possible.";
                setTimeout(function () {
                    BubbleLBlank();
                    conversation.push("<div class='bubble-right'><p id = 'Message" + sessStorageCount + "'>" + redirect + "</p></div>" + "</br>");
                    $("#response").html(conversation.join(""));
                }, 3000);
                sadCounter = 0;
            } else if (docSentiment <= -0.5 && docMagnitude >= 0.4) {
                sadCounter = sadCounter + 1;
            }
            if (sadCounter == 3) {
                var redirect = "<p>We hear you. Would you like to speak with one of our work advisory agents? </p><p>Click <a href='#' id='sentimentAngery' onclick='optionSelect(this);' value='Write an appeal to NTUC'>here</a> to share details with us and we will get back to you as soon as possible.</p>";
                setTimeout(function () {
                    BubbleLBlank();
                    conversation.push("<div class='bubble-right'><p id = 'Message" + sessStorageCount + "'>" + redirect + "</p></div>" + "</br>");
                    $("#response").html(conversation.join(""));
                }, 3000);
                sadCounter = 0;
            }
        }
    }
};

//Welcome Text
$(document).ready(function () {
    if (sessionStorage.length == 0) {
        var welcome = "Greetings! This is your Workplace Advisory Bot. Before we begin, it would be good to check whether you are covered under the Employment Act. Click below to get started.<button class='roundBtn' type='button' onclick='optionSelect(this);' id='GetStarted' value='Employment Act'><span>Click Here to Begin</span></button>  <a href=''></a>";
        conversation.push("<div class='bubble-right'><p id = 'Message" + sessStorageCount + "'>" + welcome + "</p></div>" + "</br>");
        $("#response").html(conversation.join(""));
        setSessionStorage();
    } else {
        for (i = 0;i < sessionStorage.length;i++){
            var itemVar = "item" + i;
            var getItem;
            var getItemVar = getItem + i;
            var getItemVar = sessionStorage.getItem(itemVar);
            if (i % 2 == 0){
                BubbleLBlank();
                conversation.push("<div class='bubble-right'><p id = 'Message'>" + getItemVar + "</p></div>" + "</br>");
                $("#response").html(conversation.join(""));
            } else {
                BubbleRBlank();
                conversation.push("<div class='bubble-left'><p id = 'Message'>" + getItemVar + "</p></div>" + "</br>");
                BubbleLBlank();
                $("#response").html(conversation.join(""));
            }
        };
        document.getElementById("input").disabled = false;
        sessStorageCount = sessionStorage.length;
    }
});

//Idle text and start message 
function IdleMessage() {
    //Increment the idle time counter every 15 seconds.
    var idleInterval = setInterval(timerIncrement, 15000); //  15 seconds

    //Zero the idle timer on mouse movement or keypress
    $(this).mousemove(function (e) {
        idleTime = 0;

    });

    $(this).keypress(function (e) {
        idleTime = 0;

    });
};

//Timer up
var messageTime = 10;

//Timer function
function timerIncrement() {
    idleTime = idleTime + 1;
    var check = "<p>Notice that you been gone for awhile now ☹️ Anything else i can help you with?</p><p>Here are some of the things you can ask me:</p><ul><li><a href='#' onclick='optionSelect(this)' id='HowMatLeave' value='How many days of maternity leave am I entitled to?'>How many days of maternity leave am I entitled to?</a></li><li><a href='#' id='AWSClick' onclick='optionSelect(this);' value='Am I entitled to Annual Wage Supplement?'>Am I entitled to Annual Wage Supplement?</a></li><li><a href='#' id='unfairDismissClick' onclick='optionSelect(this);' value='I was unfairly dismissed from my company, what can I do about it?'>I was unfairly dismissed from my company, what can I do about it?</a></li></ul>";
    if (idleTime == messageTime) {
        BubbleLBlank();
        conversation.push("<div class='bubble-right'><p id = 'timer'>" + check + "</p></div>" + "</br>");
        $("#response").html(conversation.join(""));
    }
};

//Blank bubbles
function BubbleLBlank() {
    conversation.push("<div class='bubble-lblank'<p id = 'blank'>" + "" + "</p></div>" + "</br>");
};

function BubbleRBlank() {
    conversation.push("<div class='bubble-rblank'<p id = 'blank'>" + "" + "</p></div>" + "</br>");
};

//Response for dialogFlow
function send() {
    var text = document.getElementById("input").value;
    //scrollable conversation effect
    var msgdiv = document.getElementById("response");
    var atbuttom = scrollAtBottom(msgdiv);
    if (text.length > 0) {
        //SendAPI();
        BubbleRBlank();
        conversation.push("<div class='bubble-left'><p id = 'Message" + sessStorageCount + "'>" + text + "</p></div></br>");
        BubbleLBlank();
        $("#response").html(conversation.join(""));
        setSessionStorage();
        //Check for NRIC
        if (text.length == 9 && text.match(/^[STFG]\d{7}[A-Z]$/)) {
            var maskArea = text.substring(text.lastIndexOf("S") + 4, 9);
            var maskedNRIC = text.replace(maskArea, "XXXXX");
            console.log(maskedNRIC);
            finalText = maskedNRIC;
        } else {
            finalText = text;
        }
    }
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + mainAccessToken
        },
        data: JSON.stringify({
            query: finalText,
            lang: "en",
            sessionId: uuid
        }),
        success: function (data) {
            //Retrieve reponse text
            var respText = data.result.fulfillment.speech;
            //Retrieve Intent Name
            var intentName = data.result.metadata.intentName;
            //Send Data to analysis
            DBAnalysisInbound(finalText, intentName, data);

            //Send over to response settings
            setResponse(respText, finalText);

            var paramText = data.result.parameters;
            //Process params string 
            paramCheck(paramText);
        },
        // error: function () {
        //     setResponse("Please enter a valid response so i can reply!");
        // }
    });
};

//Option function for list select
function optionSelect(option) {
    var value = document.getElementById(option.id);
    if (value.id == "GetStarted") {
        document.getElementById("input").disabled = false;
        IdleMessage();
    }
    var finalValue = value.getAttribute("value");
    setInput(finalValue);
};

function paramCheck(paramText) {
    var paramKeys = Object.entries(paramText);

    //List variables
    var EmploymentActStatusYes = document.getElementById("EmploymentActStatusYes");
    var EmploymentActStatusNo = document.getElementById("EmploymentActStatusNo");
    var PartIVStatusYes = document.getElementById("PartIVStatusYes");
    var PartIVStatusNo = document.getElementById("PartIVStatusNo");

    //If else statement
    if (paramKeys == "EmploymentActCovered,Yes") {
        EmploymentActStatusNo.removeAttribute("hidden");
        EmploymentActStatusYes.setAttribute("hidden", true);
        PartIVStatusNo.removeAttribute("hidden");
        PartIVStatusYes.setAttribute("hidden", true);
    } else if (paramKeys == "PartIVCovered,No") {
        EmploymentActStatusYes.removeAttribute("hidden");
        EmploymentActStatusNo.setAttribute("hidden", true);
        PartIVStatusNo.removeAttribute("hidden");
        PartIVStatusYes.setAttribute("hidden", true);
    } else if (paramKeys == "PartIVCovered,Yes") {
        EmploymentActStatusYes.removeAttribute("hidden");
        EmploymentActStatusNo.setAttribute("hidden", true);
        PartIVStatusYes.removeAttribute("hidden");
        PartIVStatusNo.setAttribute("hidden", true);
    }
};

//Set item into sessionStorage
function setSessionStorage() {
    var storageItem;
    var storageItemVar = storageItem + sessStorageCount;
        itemSearch = "Message" + sessStorageCount;
        storageItemVar = document.getElementById(itemSearch);
        sessionStorage.setItem("item" + sessStorageCount, storageItemVar.innerHTML);
        sessStorageCount++;
}

//Text bubble text
function setResponse(val, input) {
    //Analyze sentiment
    var userText = input;
    if (userText !== "No") {
        if (userText !== "Unfair Dismissal" || userText !== "Unfair Retrenchment") {
            analyzeSentiment(userText);
        }
    }
    //Clear input area
    var resetInput = document.getElementById("input").value = "";

    //Send Dashboard
    cleanText = val.replace(/<\/?[^>]+(>|$)/g, "");
    DBAnalysisOutbound(cleanText);

    //Loading Bubbles
    conversation.push("<div class='bubble-right'><p class='loading'>" + "Typing" + "</p></div>" + "</br>");
    $("#response").html(conversation.join(""));
    conversation.pop();
    //Reply
    setTimeout(function () {
        BubbleLBlank();
        conversation.push("<div class='bubble-right'><p id = 'Message" + sessStorageCount + "'>" + val + "</p></div>" + "</br>");
        $("#response").html(conversation.join(""));
        setSessionStorage();
    }, 2000);
};