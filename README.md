# fatcher
The fact-checker extension for Chromium based web browsers.

Here's how to use the extension-
1. Download the zip from the "Clone or Downlaod" option you see on the right.
2. Unzip the file.
3. Go to Settings->Extensions in your Chromium based browser and enable "Developer Mode".
4. Click on the "Load unpacked" option and then select the folder "fatcher-master" inside the fatcher-master folder i.e ~/Downloads/fatcher-master/fatcher-master
5. The extension must have loaded onto your browser by now. You will find it in the top right of your browser with a "thumbs-up" icon. 
6. Click on the icon to see the extension working.

Note- The extension is not ready as of yet. When clicked on the option "Mark as fake news", the counter will increase but the data is not being stored in a database, so when the extension is closed and reopened, the counter will turn zero again. This process is happening using simple JavaScript code and for it to work in real-time, the code has to rewritten in Python (or any other server side programming language) along with a working database.
