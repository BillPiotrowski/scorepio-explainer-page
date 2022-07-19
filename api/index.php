<?php

$instances = htmlspecialchars($_GET["instances"]);

// $url = 'http://localhost:8501/v1/models/combat_detection_bert:predict';
$url = 'http://66.175.235.59:8501/v1/models/combat_detection_bert:predict';

$data = array("instances" => array($instances));

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        // 'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'header'  =>'Content-Type: application/json',
        'content' => json_encode($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

header("Content-Type: application/json");

if($result === FALSE) { 
    echo json_encode(array("error" => "no response"));
    exit();
}

$json = json_decode($result, true);
$predictions = $json['predictions'];
$prediction = $predictions[0][0];
$response = array("prediction" => $prediction);

echo json_encode($response);

exit();

?>