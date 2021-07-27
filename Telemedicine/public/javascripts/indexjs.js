function getvalue(test_id) {
    var pt_id = test_id; //document.getElementById('js_pt_id').innerHTML;
    var heart_rem_s = document.getElementById(pt_id + '_heart_rem_value').dataset.heartrem_s;
    var heart_rem_e = document.getElementById(pt_id + '_heart_rem_value').dataset.heartrem_e;
    var heart_warn_s = document.getElementById(pt_id + '_heart_warn_value').dataset.heartwarn_s;
    var heart_warn_e = document.getElementById(pt_id + '_heart_warn_value').dataset.heartwarn_e;

    var breathe_rem_s = document.getElementById(pt_id + '_breathe_rem_value').dataset.breatherem_s;
    var breathe_rem_e = document.getElementById(pt_id + '_breathe_rem_value').dataset.breatherem_e;
    var breathe_warn_s = document.getElementById(pt_id + '_breathe_warn_value').dataset.breathewarn_s;
    var breathe_warn_e = document.getElementById(pt_id + '_breathe_warn_value').dataset.breathewarn_e;

    var oxygen_rem_s = document.getElementById(pt_id + '_oxygen_rem_value').dataset.oxygenrem_s;
    var oxygen_rem_e = document.getElementById(pt_id + '_oxygen_rem_value').dataset.oxygenrem_e;
    var oxygen_warn_s = document.getElementById(pt_id + '_oxygen_warn_value').dataset.oxygenwarn_s;

    var pressure_rem_s = document.getElementById(pt_id + '_pressure_rem_value').dataset.pressurerem_s;
    var pressure_rem_e = document.getElementById(pt_id + '_pressure_rem_value').dataset.pressurerem_e;
    var pressure_warn_s = document.getElementById(pt_id + '_pressure_warn_value').dataset.pressurewarn_s;
    var pressure_warn_e = document.getElementById(pt_id + '_pressure_warn_value').dataset.pressurewarn_e;

    setInterval(f_heartrate, 800, pt_id, heart_rem_s, heart_rem_e, heart_warn_s, heart_warn_e);
    setInterval(f_breathe, 800, pt_id, breathe_rem_s, breathe_rem_e, breathe_warn_s, breathe_warn_e);
    setInterval(f_bloodoxygen, 800, pt_id, oxygen_rem_s, oxygen_rem_e, oxygen_warn_s);
    setInterval(f_systolic, 800, pt_id, pressure_rem_s, pressure_rem_e, pressure_warn_s, pressure_warn_e);
    setInterval(f_battery, 800, pt_id);
}
/*=========設定警戒顏色============*/
function f_heartrate(pt_id, heart_rem_s, heart_rem_e, heart_warn_s, heart_warn_e) {
    console.log(pt_id, heart_rem_s, heart_rem_e, heart_warn_s, heart_warn_e)
    var heartrate = parseInt(document.getElementById(pt_id + '_js_heat_value').innerHTML);
    var changecolor = document.getElementById(pt_id + '_js_heat_color');
    if ((heartrate >= heart_warn_e) || (heartrate <= heart_warn_s)) {
        changecolor.style['background-color'] = '#ff0000';//紅
    }
    else if (heartrate >= heart_rem_e && heartrate <= heart_rem_s) {
        changecolor.style['background-color'] = '#ff6600';//黃
    }
    else {
        changecolor.style['background-color'] = '#7fff00';//綠
    }
}
//舒張壓
function f_breathe(pt_id, breathe_rem_s, breathe_rem_e, breathe_warn_s, breathe_warn_e) {
    var breathe = parseInt(document.getElementById(pt_id + '_js_breathe_value').innerHTML);
    var changecolor = document.getElementById(pt_id + '_js_breathe_color');
    if (breathe >= breathe_warn_e || breathe <= breathe_warn_s) {
        changecolor.style['background-color'] = '#ff0000';//紅
    }
    else if (breathe >= breathe_rem_e && breathe <= breathe_rem_s) {
        changecolor.style['background-color'] = '#ff6600';//黃
    }
    else {
        changecolor.style['background-color'] = '#7fff00';//綠
    }
}
//收縮壓
function f_systolic(pt_id, pressure_rem_s, pressure_rem_e, pressure_warn_s, pressure_warn_e) {
    var pressure = parseInt(document.getElementById(pt_id + '_js_pressure_value').innerHTML);
    var changecolor = document.getElementById(pt_id + '_js_pressure_color');
    if (pressure >= pressure_warn_e || pressure <= pressure_warn_s) {
        changecolor.style['background-color'] = '#ff0000';//紅
    }
    else if (pressure >= pressure_rem_s && pressure <= pressure_rem_e) {
        changecolor.style['background-color'] = '#ff6600';//黃
    }
    else {
        changecolor.style['background-color'] = '#7fff00';//綠
    }
}

//血氧
function f_bloodoxygen(pt_id, oxygen_rem_s, oxygen_rem_e, oxygen_warn_s) {
    var oxygen = parseInt(document.getElementById(pt_id + '_js_oxygen_value').innerHTML);
    var changecolor = document.getElementById(pt_id + '_js_oxygen_color');
    if (oxygen <= oxygen_warn_s) {
        changecolor.style['background-color'] = '#ff0000';//紅
    }
    else if (oxygen >= oxygen_rem_s && oxygen <= oxygen_rem_e) {
        changecolor.style['background-color'] = '#ff6600';//黃
    }
    else {
        changecolor.style['background-color'] = '#7fff00';//綠
    }
}
//電池
function f_battery(pt_id) {
    var battery = parseInt(document.getElementById(pt_id + '_js_battery_value').innerHTML);
    var changecolor = document.getElementById(pt_id + '_js_battery_color');
    if (battery <= 30) {
        changecolor.style['background-color'] = '#ff0000';//紅
    }
    else if (battery <= 60) {
        changecolor.style['background-color'] = '#ff6600';//黃
    }
    else {
        changecolor.style['background-color'] = '#7fff00';//綠
    }
}
/*======================彈跳display區塊===================================== */
function setting_dis(pt_inf) {
    var call_setting = document.getElementById('js_setting');
    call_setting.style['display'] = 'flex';
    var back_color = document.getElementById('js_backgroundcolor');
    back_color.style['opacity'] = '0.3';
    var change_partition = document.getElementById('js_partition');
    change_partition.style['display'] = 'flex';
    document.getElementById('js_setting_name').innerHTML = pt_inf.name;
    document.getElementById('js_setting_id').innerHTML = pt_inf.value;
    document.getElementById('js_setting').action = 'setting/' + pt_inf.value;
}
function hid_setting() {
    var cancal_setting = document.getElementById('js_setting');
    cancal_setting.style['display'] = 'none';
    var back_color = document.getElementById('js_backgroundcolor');
    back_color.style['opacity'] = '1';
    var change_partition = document.getElementById('js_partition');
    change_partition.style['display'] = 'none';
}
function addition_dis() {
    var call_addition = document.getElementById('js_addition');
    call_addition.style['display'] = 'flex';
    var back_color = document.getElementById('js_backgroundcolor');
    back_color.style['opacity'] = '0.3';
    var change_partition = document.getElementById('js_partition');
    change_partition.style['display'] = 'flex';
}
function hid_addition() {
    var call_addition = document.getElementById('js_addition');
    call_addition.style['display'] = 'none';
    var back_color = document.getElementById('js_backgroundcolor');
    back_color.style['opacity'] = '1';
    var change_partition = document.getElementById('js_partition');
    change_partition.style['display'] = 'none';
}
function chart_dis(pt_inf) {
    var call_chart = document.getElementById('js_chart');
    call_chart.style['display'] = 'flex';
    var back_color = document.getElementById('js_backgroundcolor');
    back_color.style['opacity'] = '0.3';
    var change_partition = document.getElementById('js_partition');
    change_partition.style['display'] = 'flex';
    document.getElementById('js_chart_name').innerHTML = pt_inf.name;
    document.getElementById('js_chart_id').innerHTML = pt_inf.value;
}
function hid_chart() {
    var cancal_chart = document.getElementById('js_chart');
    cancal_chart.style['display'] = 'none';
    var back_color = document.getElementById('js_backgroundcolor');
    back_color.style['opacity'] = '1';
    var change_partition = document.getElementById('js_partition');
    change_partition.style['display'] = 'none';
    window.options_H.destroy();
    window.options_D.destroy();
    window.options_S.destroy();
    window.options_O.destroy();
}
/*=======================setting警戒數值=============================== */
/*=======================身分證驗證=========================================== */
function verification() {
    var pt_ID = document.getElementById('js_pt_ID').value;
    var pt_sex = document.getElementById('js_pt_sex').value;
    const rule = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
    const area = ["A", "B", "C", "D", "E", "F", "G",
        "H", "J", "K", "L", "M", "N", "P",
        "Q", "R", "S", "T", "U", "V", "X",
        "Y", "W", "Z", "I", "O"];
    var str_id = pt_ID.substr(1);
    var nums = new Array(2);
    var sum = 0;
    if (pt_ID[1] != pt_sex) {
        document.getElementById('js_pt_id_error').innerHTML = "請輸入確認性別及身分證字號";
    }
    else {
        for (var i = 0; i < 26; i++) {
            if (pt_ID[0] == area[i]) {
                var firstNum = i + 10;
                nums[0] = Math.floor(firstNum / 10);
                nums[1] = firstNum - (nums[0] * 10);
            }
        }
        for (var i = 0; i < str_id.length; i++) {
            nums.push(parseInt(str_id[i]));
        }
        for (var i = 0; i < 11; i++) {
            sum = sum + (nums[i] * rule[i]);
        }
        if (sum % 10 != 0) {
            document.getElementById('js_pt_id_error').innerHTML = "請輸入正確的身分證字號";
        }
        else {
            document.getElementById('js_pt_id_error').innerHTML = "";
            document.getElementById('js_confirm').type = 'submit';
            document.getElementById('js_confirm').click();
        }
    }
}
/*========修改警示值資料驗證======================== */
function check_warnvalue() {
    var rem_s = parseInt(document.getElementById('remind_start').value);
    var rem_e = parseInt(document.getElementById('remind_end').value);
    var warn_s = parseInt(document.getElementById('warn_start').value);
    var warn_e = parseInt(document.getElementById('warn_end').value);
    console.log(rem_s, rem_e, warn_s, warn_e)
    if ((rem_s >= rem_e) || (warn_s >= warn_e) || (rem_s <= warn_s) || (rem_e >= warn_e)) {
        document.getElementById('set_value_error').innerHTML = '請輸入正確的警示值資料';
    }
    else {
        document.getElementById('set_value_error').innerHTML = '';
        document.getElementById('js_set_warn_form').type = 'submit';
        document.getElementById('js_set_warn_form').click();
    }
};
/*=================繪製圖表==================== */
function chart(pt_inf) {
    var ptID = pt_inf.value;
    $.ajax({
        method: 'get',
        data: { ID: ptID },
        url: 'http://localhost:8080/ChartData',
        success: function (res) {
            var chartData = Object.keys(res).map(function (_) { return res[_]; });
            var ChartHeart = new Array;
            var ChartDiastolic = new Array;
            var ChartSystolic = new Array;
            var ChartOxygen = new Array;
            var ChartDate = new Array;
            for (i = 0; i < chartData[0].length; i++) {
                ChartHeart.push(parseInt(chartData[0][i].HeartRate));
                ChartDiastolic.push(parseInt(chartData[0][i].DiastolicBlood));
                ChartSystolic.push(parseInt(chartData[0][i].SystolicBlood));
                ChartOxygen.push(parseInt(chartData[0][i].SPO2));
                ChartDate.push(parseInt(chartData[0][i].Date));
            };
            /*=============highchart.js=============== */
            var Time = new Array;
            Time = chartData[0][0].Date
            var displayDate = Time.split(/-|:|\//).map(Number);
            console.log(displayDate)
            var options_H = {
                chart: {
                    backgroundColor: 'transparent',
                    type: 'spline', //指定圖表的類型，默認是折線圖（line）spline是光滑的曲線
                },
                title: {
                    text: '心律變化',
                    style: {
                        color: 'white',
                        font: 'bold 28px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                credits: { text: " " },//右下角連結
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {minute: '%H:%M'}
                },
                yAxis: { title: { text: ' ' } },
                plotOptions: {//開啓圖上的數據顯示
                    spline: {
                        dataLabels: { enabled: false },// 開啓數據標籤
                        enableMouseTracking: false,// 關閉鼠標跟蹤，對應的提示框、點擊事件會失效
                    }
                },
                legend: {
                    itemStyle: {
                        color: 'white',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
                    }
                },
                series: [{
                    name: '心律',
                    data: ChartHeart,
                    pointStart: Date.UTC(displayDate[0], displayDate[1], displayDate[2], displayDate[3], displayDate[4], displayDate[5]),
                    pointInterval: 1 * 1000,//這個設置的時間要和dateTimeLabelFormats下的時間最小一致
                    color: '#f9c80e',//折線的顏色
                    // 決定圖形的形狀
                    marker: {
                        radius: 1,
                        enabled: true,
                        symbol: "circle",
                        fillColor: '#f9c80e'
                    }
                }]
            };
            // 圖表初始化函數
            var chart = Highcharts.chart('container_heart', options_H);
            /**===========di============= */
            var options_D = {
                chart: {
                    backgroundColor: 'transparent',
                    type: 'spline', //指定圖表的類型，默認是折線圖（line）spline是光滑的曲線
                },
                title: {
                    text: '舒張壓變化',
                    style: {
                        color: 'white',
                        font: 'bold 28px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                credits: { text: " " },//右下角連結
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {minute: '%H:%M'}
                },
                yAxis: { title: { text: ' ' } },
                plotOptions: {//開啓圖上的數據顯示
                    spline: {
                        dataLabels: { enabled: false },// 開啓數據標籤
                        enableMouseTracking: false,// 關閉鼠標跟蹤，對應的提示框、點擊事件會失效
                    }
                },
                legend: {
                    itemStyle: {
                        color: 'white',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
                    }
                },
                series: [
                {
                    name: '舒張壓',
                    data: ChartDiastolic,
                    pointStart: Date.UTC(displayDate[0], displayDate[1], displayDate[2], displayDate[3], displayDate[4], displayDate[5]),
                    pointInterval: 1 * 1000,//這個設置的時間要和dateTimeLabelFormats下的時間最小一致
                    color: '#f86624',//折線的顏色
                    marker: {
                        radius: 1,
                        enabled: true,
                        symbol: "circle",
                        fillColor: '#f86624'
                    }
                },]
            };
            // 圖表初始化函數
            var chart = Highcharts.chart('container_diastolic', options_D);

            /**================sy=============================== */
            var options_S = {
                chart: {
                    backgroundColor: 'transparent',
                    type: 'spline', //指定圖表的類型，默認是折線圖（line）spline是光滑的曲線
                },
                title: {
                    text: '收縮壓變化',
                    style: {
                        color: 'white',
                        font: 'bold 28px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                credits: { text: " " },//右下角連結
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {minute: '%H:%M'}
                },
                yAxis: { title: { text: ' ' } },
                plotOptions: {//開啓圖上的數據顯示
                    spline: {
                        dataLabels: { enabled: false },// 開啓數據標籤
                        enableMouseTracking: false,// 關閉鼠標跟蹤，對應的提示框、點擊事件會失效
                    }
                },
                legend: {
                    itemStyle: {
                        color: 'white',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
                    }
                },
                series: [
                {
                    name: '收縮壓',
                    data: ChartSystolic,
                    pointStart: Date.UTC(displayDate[0], displayDate[1], displayDate[2], displayDate[3], displayDate[4], displayDate[5]),
                    pointInterval: 1 * 1000,//這個設置的時間要和dateTimeLabelFormats下的時間最小一致
                    color: '#43bccd',//折線的顏色
                    marker: {
                        radius: 1,
                        enabled: true,
                        symbol: "circle",
                        fillColor: '#43bccd'
                    }
                },]
            };
            // 圖表初始化函數
            var chart = Highcharts.chart('container_systolic', options_S);

            /**=================oxygen============================ */
            var options_O = {
                chart: {
                    backgroundColor: 'transparent',
                    type: 'spline', //指定圖表的類型，默認是折線圖（line）spline是光滑的曲線
                },
                title: {
                    text: '血氧變化',
                    style: {
                        color: 'white',
                        font: 'bold 28px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                credits: { text: " " },//右下角連結
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {minute: '%H:%M'}
                },
                yAxis: { title: { text: ' ' } },
                plotOptions: {//開啓圖上的數據顯示
                    spline: {
                        dataLabels: { enabled: false },// 開啓數據標籤
                        enableMouseTracking: false,// 關閉鼠標跟蹤，對應的提示框、點擊事件會失效
                    }
                },
                legend: {
                    itemStyle: {
                        color: 'white',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
                    }
                },
                series: [
                {
                    name: '血氧',
                    data: ChartOxygen,
                    pointStart: Date.UTC(displayDate[0], displayDate[1], displayDate[2], displayDate[3], displayDate[4], displayDate[5]),
                    pointInterval: 1 * 1000,//這個設置的時間要和dateTimeLabelFormats下的時間最小一致
                    color: '#7cb518',//折線的顏色
                    marker: {
                        radius: 1,
                        enabled: true,
                        symbol: "circle",
                        fillColor: '#7cb518'
                    }
                },]
            };
            // 圖表初始化函數
            var chart = Highcharts.chart('container_oxygen', options_O);

        },
        error: function (err) {
            console.log(err);
        }
    });
}


/*=======================手環連線============================ */
const TOPIC = "publish_watch";
var client = false;
var I = 0
// 用戶端成功連接 broker 時...
function onConnect() {
    console.log("onConnect then subscribe topic");
    client.subscribe(TOPIC);
}

// 收到訊息時...
function onMessageArrived(message) {
    var mess = String(message.payloadString)
    if (mess.indexOf("5632") != -1) {
        console.log(mess)
        data_list = mess.split(",")
        wristband_data = String(data_list[4]).slice(30, 62)
        console.log(wristband_data)
        console.log(I)
        I++
        var NC = parseInt(wristband_data.slice(0, 2), 16);
        var SOS = parseInt(wristband_data.slice(2, 4), 16);
        var Steps = parseInt(wristband_data.slice(4, 10), 16);
        var Hea = parseInt(wristband_data.slice(10, 12), 16);
        var Sle = parseInt(wristband_data.slice(12, 16), 16);
        var Bat = parseInt(wristband_data.slice(16, 18), 16);
        var Time = parseInt(wristband_data.slice(18, 22), 16);
        var Dia = parseInt(wristband_data.slice(22, 24), 16);
        var Sys = parseInt(wristband_data.slice(24, 26), 16);
        var SPO2 = parseInt(wristband_data.slice(26, 28), 16);
        var MAC = parseInt(wristband_data.slice(28, 32), 16);
        $.ajax({
            method: 'get',
            data: { NC: NC, SOS: SOS, Steps: Steps, Hea: Hea, Sle: Sle, Bat: Bat, Time: Time, Dia: Dia, Sys: Sys, SPO2: SPO2, MAC: MAC },
            url: 'http://localhost:8080/getID',
            success: function (res) {
                let str = "";
                var ID = res
                if (ID != 0) {
                    const nameHeart = document.getElementsByName('Heart rate' + ID.toString());
                    const nameDiastolic = document.getElementsByName('Diastolic blood' + ID.toString());
                    const nameSystolic = document.getElementsByName('Systolic blood' + ID.toString());
                    const nameoxygen = document.getElementsByName('Blood oxygen' + ID.toString());
                    const nameBattery = document.getElementsByName('Battery' + ID.toString());
                    nameHeart[0].innerHTML = Hea
                    nameDiastolic[0].innerHTML = Dia
                    nameSystolic[0].innerHTML = Sys
                    nameoxygen[0].innerHTML = SPO2
                    nameBattery[0].innerHTML = Bat
                }
            },
            error: function (err) {
                console.log(err);
            },
            timeout: 2000
        })
    }
}

function init() {
    client = new Paho.MQTT.Client("172.20.10.2", 9002, "clientId");
    client.onMessageArrived = onMessageArrived;
    // 連接 MQTT broker
    client.connect({
        onSuccess: onConnect
    });

    //****警示值呼叫******
    var ptnum = document.getElementById('js_getpt').dataset.ptnum;
    var pt_count = ptnum.split(',');
    for (var i = 0; i < pt_count.length; i++) {
        getvalue(pt_count[i]);
    }
}
function client_disconnect() {
    client.disconnect();
    console.log("Client is close")
}


