<?php

$input_str = file_get_contents("php://input");
$input_json = json_decode($input_str,true);
/*

$asset_group_id =   "994db1b032803b760e40a6094856ad2411f5f134e9e08fb5ebb968e6442098b5";
$tx_id =            "7599c8dc204b94c96dad9880f56e98e4d0efb6d5d487538a8a3216699f2ae1a8";
$user_id =          "2b08d6d7d7cfa1544f12263187b895c1676d9be8282d0f743b89cdfd69fb5a66";
*/

$asset_group_id = $input_json["asset_group_id"];
$tx_id =          $input_json["tx_id"];
$user_id =        $input_json["user_id"];

$result = get_all_reftx($asset_group_id, $tx_id, $user_id);
echo json_encode($result);

function get_all_reftx($asset_group_id, $tx_id, $user_id){
    $result[] = get_tx($asset_group_id, $tx_id, $user_id);
    if(count($result[0]->Reference) != 0){
        foreach($result[0]->Reference as $ref){
            $result = array_merge($result, get_all_reftx($ref->asset_group_id, $ref->transaction_id, $user_id));
        }
    }
    return $result;
}


function get_tx($asset_group_id, $tx_id, $user_id){
    $url = 'http://localhost:9000';
    $data = ["jsonrpc" => "2.0",
            "method"=> "bbc1_GetTransaction",
            "params"=> [
                "asset_group_id" => $asset_group_id,
                "tx_id" => $tx_id,
                "user_id" => $user_id
            ],
            "id" => 5000
        ];

    $options = ['http' => [
                'method'  => 'POST',
                'content' => json_encode($data),
                'header'  => "Content-Type: application/json\r\n" .
                             "Accept: application/json\r\n"
                 ]];
    $options = stream_context_create($options);
    $contents = json_decode(file_get_contents($url, false, $options));
    return $contents->result;
}
