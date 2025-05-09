<?php
//php -S localhost:8000
//recent run data
$file = "leaderBoard.json";
$isReset = false;
$requestData = json_decode(file_get_contents("php://input"), true);

//whats currently displayed on the board
$currentBoard = json_decode(file_get_contents($file), true);

//checks to see if the main json file is an array, will reset it if not
if (!is_array($currentBoard)) {
  $currentBoard = [];
  $isReset = true;
}

$categories = array_keys($requestData);

foreach($categories as $category){
  $catorgoryData = $requestData[$category];
  $score = $catorgoryData['score'];

  //checks to see if the category is in the leader board
  if(!isset($currentBoard[$category])){
    $currentBoard[$category] = []; //makes an array if not used
  }


  if(!isset($currentBoard[$category]["$score"])){
    $currentBoard[$category]["$score"] = [];
  }

  //will push a new array to the category
  if($catorgoryData["username"] === '') $catorgoryData["username"] = 'unnamed';
  $currentBoard[$category]["$score"][] = ["username" => $catorgoryData["username"], "score" => $catorgoryData["score"]];
}


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