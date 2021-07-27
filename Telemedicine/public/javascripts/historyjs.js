function his_init(){
    var pt_id = (document.getElementById('his_choose_pt').dataset.pt_num).split(',');
    
    for(var i = 0; i < pt_id.length;i++){
        document.getElementById("js_his_chosept").options.add(new Option(pt_id[i], pt_id[i]));
    }
}
function search() {
    var start = (document.getElementById('start_date').value).split('-');
    var end = (document.getElementById('end_date').value).split('-');
    
    console.log(start, end)
    if ((parseInt(start[0]) < parseInt(end[0])) ||
       ((parseInt(start[0]) == parseInt(end[0])) && (parseInt(start[1]) < parseInt(end[1]))) ||
       ((parseInt(start[0]) == parseInt(end[0])) && (parseInt(start[1]) == parseInt(end[1])) && (parseInt(start[2]) <= parseInt(end[2])))) {
        document.getElementById('js_his_searbut').type = "sumbit";
        document.getElementById('js_his_date_err').innerHTML = "";
        document.getElementById('js_his_searbut').click();

    }
    else {
        document.getElementById('js_his_date_err').innerHTML = "請輸入正確日期";
    }


}
/*var test = document.getElementById('js_his_chart').dataset.pt_history;
console.log(test)*/