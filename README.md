# SASS Autocompiler for Windows
 
This plugin allows you to compile a Sass file into a Css file.
The generated Css file is not created in the same folder as the sass file but the plugin modifies the open Css file in atom.
In this way, if the Sass file and the Css file are in two different folders of the project, there will be no problems.

## Requirements
- <a href="https://github.com/sass/dart-sass">Dart Sass</a>

Add the sass.bat folder to the Windows Enviroment Variables

## Usage

- Open both the Sass file and the Css file, the Css file name has to be the same as the Sass file (for example: test.sass and test.css)
- While staying on the Sass file tab, press Ctrl + Alt + c, a success alert and the command prompt should appear
- Write your Sass file and save it, then the watcher will automatically compile the Css code and save it in the Css file
- Once all the changes have been made, to close the watcher go to the command prompt and press Ctrl + c