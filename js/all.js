var data = JSON.parse(localStorage.getItem('listData')) || [];
document.addEventListener("DOMContentLoaded", function () {
    var bmiList = document.getElementById("bmiList");
    var btn_result = document.getElementById("btn_result");
    var resultText = document.getElementById("resultText");
    var smallText = document.getElementById("smallText");
    var largeText = document.getElementById("largeText");
    var btn_redo = document.getElementById("btn_redo");
    updateList(data);
    btn_result.addEventListener("click", function checkBMI() {
        var regex = new RegExp("^[0-9]*$");
        var height = document.getElementById("height");
        var weight = document.getElementById("weight");
        if (regex.test(parseInt(height.value)) & regex.test(parseInt(weight.value))) {
            var BMIclass = BMItext(BMICal(height.value, weight.value));
            addData(BMIclass, largeText.textContent, BMICal(height.value, weight.value), weight.value, height.value);
            btn_result.classList.add(BMIclass);
            largeText.classList.add(BMIclass);
            btn_redo.classList.add("bg-" + BMIclass);
            btn_redo.style.display = "block";
            smallText.style.display = "block";
            largeText.style.display = "block";
            updateList(data);
            btn_result.removeEventListener('click',checkBMI);
        }
        else {
            alert("輸入錯誤");
        }
    })
    btn_redo.addEventListener("click", function () {
        var height = document.getElementById("height");
        var weight = document.getElementById("weight");
        var BMIclass = BMItext(BMICal(height.value, weight.value));
        btn_result.classList.remove(BMIclass);
        largeText.classList.remove(BMIclass);
        btn_redo.classList.remove("bg-" + BMIclass);
        btn_redo.style.display = "none";
        smallText.style.display = "none";
        largeText.style.display = "none";
        resultText.textContent = "看結果";
        height.value = "";
        weight.value = "";
    })
});

function BMICal(height, weight) {
    var heightcm = height / 100;
    var bmi = (weight / (heightcm * heightcm)).toFixed(2);
    return bmi;
}
function BMItext(bmiValue) {
    var bmitext = "";
    if (bmiValue < 18.5 && bmiValue >= 0) {
        bmitext = "underweight";
        largeText.textContent = "過輕";
    }
    else if (bmiValue >= 18.5 && bmiValue < 25) {
        bmitext = "normal";
        largeText.textContent = "標準";
    }
    else if (bmiValue >= 25 && bmiValue < 30) {
        bmitext = "overweight";
        largeText.textContent = "過重";
    }
    else if (bmiValue >= 30 && bmiValue < 35) {
        bmitext = "obese1";
        largeText.textContent = "輕度肥胖";
    }
    else if (bmiValue >= 35 && bmiValue < 40) {
        bmitext = "obese1";
        largeText.textContent = "中度肥胖";
    }
    else if (bmiValue >= 40) {
        bmitext = "obese2";
        largeText.textContent = "重度肥胖";
    }
    else {
        alert("輸出錯誤");
    }
    resultText.textContent = bmiValue;
    return bmitext;
}
function addData(classname, text, bmiValue, weight, height) {
    var today = new Date();
    var now = today.toLocaleDateString();
    var list = {
        class: classname,
        bmiText: text,
        bmi: bmiValue,
        w: weight,
        h: height,
        time: now,
    };
    data.push(list);
    localStorage.setItem('listData', JSON.stringify(data));
}
function updateList(items) {
    var str = "";
    var len = items.length;
    for (var i = 0; len > i; i++) {
        str += '<li><span class="bg-' + items[i].class + '" id="bmiColor"></span><div><p>' + items[i].bmiText + '</p><p><span>BMI</span> ' + items[i].bmi + '</p><p><span>weight</span> ' + items[i].w + '</p><p><span>height</span> ' + items[i].h + '</p><p><span>' + items[i].time + '</span></p></div></li>';
    }
    bmiList.innerHTML = str;
}
