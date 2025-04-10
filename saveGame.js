function saveGame(character){
    // The content of the file
    const content = 'Hello, this is a text file created by JavaScript!';
            
    // Create a Blob object with the content
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'myfile.txt'; // Specify the name of the file to download
    
    // Trigger the download
    link.click();
    
    // Clean up the object URL
    URL.revokeObjectURL(link.href);
}