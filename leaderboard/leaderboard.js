const fs = require('fs');

function updateLeaderBoard(){
    fs.writeFile("leaderboard/leaderBoard.json", "hello wolrd", (err) => {
        if (err) {
          console.error('An error occurred:', err);
        } else {
          console.log('File written successfully!');
        }
    })
}