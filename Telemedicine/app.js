// app.js
//import modeules
import express, { query } from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
const app = express();
const port = 8080;
app.use(bodyParser());//要去下載解讀body的套件
//----------------設定模板引擎---------------------//
app.engine('handlebars', exphbs('defaultLayout: main'))
app.set('view engine', 'handlebars')
//設定允許存取
app.use(express.static('public'))

//create server
app.listen(port, () => {
    console.log(`server listen to http://localhost:${port}`)
})

//===========建立連線資料庫===要去mysql修改使用者權限 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789'
import mysql from 'mysql';
var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456789',
    database: 'watch_db'
});
// 建立連線後不論是否成功都會呼叫
conn.connect(function (err) {
    if (err) throw err;
    console.log('connect success!');
});
//==============設定路由==============================//
app.get('/', function (req, res, next) {
    conn.query('SELECT * FROM `pt_information`', function (err, result, fields) {
        if (err) throw err;
        var ptNum = new Array;
        for (var i = 0; i < result.length; i++) {
            ptNum.push(result[i].ID);
        }
        res.render('index', { 'add_count': result, 'ptNum': ptNum });
    });
});
app.get('/history', (req, res) => {
    conn.query('SELECT ID FROM `pt_information`', function (err, result, fields) {
        if (err) throw err;
        var ptNum = new Array;
        for (var i = 0; i < result.length; i++) {
            ptNum.push(result[i].ID);
        }
        res.render('history', { 'ptNum': ptNum });
    })
});
/*============history.js讀取db==================*/
app.post('/search_db', (req, res) => {
    var ptid = req.body.his_pt_id;
    var start = req.body.start;
    var end = req.body.end;
    console.log(typeof (start))

    var sear_pt_mac = 'SELECT MAC FROM `pt_information` where ID = ' + ptid;
    console.log(sear_pt_mac)
    conn.query(sear_pt_mac, function (err, result, fields) {
        if (err) throw err;
        var ptmac = result[0].MAC;
        var sear_his_sql = 'SELECT * FROM `watch_data` where MAC = ' + ptmac + ' and Date >= ' + '"' + start + '/00:00:00"' + " and Date <= " + '"' + end + '/00:00:00"';
        console.log(sear_his_sql)
        conn.query(sear_his_sql, function (err, result, fields) {
            if (err) throw err;
            conn.query('SELECT ID FROM `pt_information`', function (err, res_ptid, fields) {
                if (err) throw err;
                var ptNum = new Array;
                for (var i = 0; i < res_ptid.length; i++) {
                    ptNum.push(res_ptid[i].ID);
                }
                res.render('history', { 'response': result, 'ptNum': ptNum });
            })
        });
    });
});
/*=====================add new P't=======================*/
import nodemailer from 'nodemailer';
app.post('/pt_add', (req, res) => {
    var newpt_name = req.body.pt_name;
    var newpt_ID = req.body.pt_ID;
    var newpt_gender = req.body.pt_gender;
    var newpt_number = req.body.pt_number;
    var newpt_email = req.body.pt_email;
    var newpt_MAC = req.body.pt_MAC
    var add_sql = "INSERT INTO `pt_information` SET `pt_name`=" + '"' + newpt_name + '"' + ", `pt_ID`=" + '"' + newpt_ID + '"' + ", `pt_gender`=" + '"' + newpt_gender + '"' + ", `pt_email_acc`=" + '"' + newpt_email + '"' + ", `pt_pwd`=" + '"' + newpt_ID + '"' + ", `pt_phone`=" + '"' + newpt_number + '"' + ", `MAC`=" + '"' + newpt_MAC + '"' + ", `heart_rem_s`= 111, `heart_rem_e`= 130, `heart_warn_s`= 40, `heart_warn_e`= 131, `breathe_rem_s`= 50, `breathe_rem_e`= 90, `breathe_warn_s`= 40, `breathe_warn_e`= 120, `oxygen_rem_s`= 92, `oxygen_rem_e`= 93, `oxygen_warn_s`= 91, `oxygen_warn_e`= 101, `pressure_rem_s`= 91, `pressure_rem_e`= 100, `pressure_warn_s`= 90, `pressure_warn_e`= 220";
    conn.query(add_sql, function (err, result) {
        if (err) throw err;
        res.redirect('/');
    });
    /*==============================發送確認信=========================== */
    //建立一個SMTP客戶端物件
    const hostmail = {
        host: 'smtp.gmail.com',
        service: 'Gmail',
        auth: {
            user: 'benjamintu1514@gmail.com',
            pass: 'benjamin8904145256'
        }
    };
    const transporter = nodemailer.createTransport(hostmail);
    //傳送郵件
    function verifymail(mail) {
        transporter.sendMail(mail, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('mail sent:', info.response);
        });
    };
    var mailcontent = {
        from: '老番顛智能醫戶系統管理中心 <pasc3d.edu@gmail.com>',
        subject: '[系統信箱啟用通知]',
        to: newpt_email,
        text: `尊敬的${newpt_name}  先生/小姐，您好!
很高興您使用老番顛健康照護系統，
您的帳戶(${newpt_email})已經成功啟用，
未來本系統有任何的通知與生理數據的警告，將透過此系統來聯絡您。
        
        
如有任何問題，請洽詢免付費電話：0800-090000，謝謝。`
    };
    verifymail(mailcontent);
});
/*======================minus p't======================= */
app.get('/pt_minus/:id', (req, res) => {
    var minus_pt_id = req.params.id;
    var minus_sql_ptinformation = "DELETE FROM `pt_information` WHERE `ID`=" + '"' + minus_pt_id + '"';
    conn.query(minus_sql_ptinformation, function (err, result) {
        if (err) throw err;
        res.redirect('/');
    });
});
/*====================修改警戒值數據============================= */
app.get('/setting/:id', (req, res) => {
    var pt_id = req.params.id;
    var set_items = req.query.set_items;
    var rem_s = req.query.remind_start;
    var rem_e = req.query.remind_end;
    var warn_s = req.query.warn_start;
    var warn_e = req.query.warn_end;
    var modify_warnvalue = "UPDATE `pt_information` SET `" + set_items + "_rem_s` = " + rem_s + ", `" + set_items + "_rem_e` = " + rem_e + ", `" + set_items + "_warn_s` = " + warn_s + ", `" + set_items + "_warn_e` = " + warn_e + " WHERE `ID` = " + pt_id;
    conn.query(modify_warnvalue, function (err, result) {
        if (err) throw err;
        res.redirect('/');
    });
});
/*====================用MAC位址找ID=================要改寫 寫id進資料庫============ */
app.get('/getID', (req, res, next) => {
    var sql = "SELECT ID FROM watch_db.pt_information WHERE MAC LIKE " + '"' + req.query.MAC + '"';
    conn.query(sql, function (err, result) {
        if (result.length != 0) {
            res.send(result[0].ID.toString())
            var tt = new Date()
            var Year = tt.getFullYear().toString()
            var Mon = (tt.getMonth() + 1).toString()
            var D = tt.getDate().toString()
            var H = tt.getHours().toString()
            var M = tt.getMinutes().toString()
            var S = tt.getSeconds().toString()
            var date = (Year + "-" + Mon + "-" + D + "-" + H + "-" + M + "-" + S)
            var addData_sql = "INSERT INTO `watch_data` SET `NC`=" + '"' + req.query.NC + '"' + ", `SOS`=" + '"' + req.query.SOS + '"' + ", `HeartRate`=" + '"' + req.query.Hea + '"' + ", `SleepData`=" + '"' + req.query.Sle + '"' + ", `Battery`=" + '"' + req.query.Bat + '"' + ", `Time`=" + '"' + req.query.Time + '"' + ", `DiastolicBlood`=" + '"' + req.query.Dia + '"' + ", `SystolicBlood`=" + '"' + req.query.Sys + '"' + ", `SPO2`=" + '"' + req.query.SPO2 + '"' + ", `MAC`=" + '"' + req.query.MAC + '"' + ", `date`=" + '"' + date + '"';
            conn.query(addData_sql, function (err, result) {
                ///寫入資料庫
            });
        }
        else {
            res.send("0".toString())
        }
    });
});

/*=============chart 找資料===================== */
app.get('/ChartData', (req, res, next) => {//還要改資料選取的條件
    var sear_pt_mac = 'SELECT MAC FROM `pt_information` where ID = ' + req.query.ID;
    var today = new Date();
    var SearTime = [today.getFullYear(), (today.getMonth() + 1), (today.getDate()-1), today.getHours(), today.getMinutes(), today.getSeconds()];
    conn.query(sear_pt_mac, function (err, resMAC, fields) {
        if (err) throw err;
        var ptmac = resMAC[0].MAC;
        var sear_his_sql = 'SELECT * FROM `watch_data` where MAC = ' + ptmac; + ' and Date >= ' + '"' +SearTime + '"'
        conn.query(sear_his_sql, function (err, result, fields) {
            if (err) throw err;
            var chartdata = JSON.parse(JSON.stringify(result));
            res.send({ 'response': chartdata });
            console.log(result)
        });
    });
})
