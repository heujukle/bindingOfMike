<?php
//php -S localhost:8000
//recent run data
$file = "leaderBoard.json";
$isReset = false;
$requestData = json_decode(file_get_contents("php://input"), true);
$area = $requestData['areaCount'];
//whats currently displayed on the board
$currentBoard = json_decode(file_get_contents($file), true);

if (!is_array($currentBoard)) {
  $currentBoard = [];
  $isReset = true;
}

if(!isset($currentBoard[$area])){
  $currentBoard[$area] = [];
}

$currentBoard[$area][] = ["username" => $requestData["username"], "areaCount" => $requestData["areaCount"]];

if (file_put_contents($file, json_encode($currentBoard, JSON_PRETTY_PRINT)) === false) {
  echo json_encode(["status" => "error", "message" => $currentBoard]);
  exit;
}

header('Content-Type: application/json');
echo json_encode([
    "status" => "success",
    "message" => $currentBoard,
    "reset" => $isReset,
]);
exit;
?>