var Mac;
var dis_mac = new Array();
//const TOPIC = "publish_watch";
function init_conn() {
    client_conn = new Paho.MQTT.Client("172.20.10.2", 9002, "clientId");
    client_conn.onMessageArrived = onMessageArrived_conn;
    console.log("Client_conn is open")
    client_conn.connect({
        onSuccess: onConnect_conn
    });
}

function onConnect_conn() {
    console.log("onConnect then subscribe topic");
    client_conn.subscribe("publish_watch");
}

function onMessageArrived_conn(message) {
    var mess = String(message.payloadString);
    if (mess.indexOf("5632") != -1) {
        data_list = mess.split(",")
        wristband_data = String(data_list[4]).slice(30, 62)
        Mac = parseInt(wristband_data.slice(28, 32), 16);
        if (!dis_mac.includes(Mac)){
            dis_mac.push(Mac)
        }
        else{
            client_conn.disconnect();
            var dis_maclength = dis_mac.length;
            for (var i = 0; i < dis_maclength; i++) {
                document.getElementById("js_pt_MAC").options.add(new Option(dis_mac[i], dis_mac[i]));
            }
        }
    }

}