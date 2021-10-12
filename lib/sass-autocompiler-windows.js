'use babel';

import SassAutocompilerWindowsView from './sass-autocompiler-windows-view';
import { CompositeDisposable } from 'atom';

export default {

  sassAutocompilerWindowsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sassAutocompilerWindowsView = new SassAutocompilerWindowsView(state.sassAutocompilerWindowsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sassAutocompilerWindowsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sass-autocompiler-windows:start-watcher': () => this.startWatcher()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sassAutocompilerWindowsView.destroy();
  },

  serialize() {
    return {
      sassAutocompilerWindowsViewState: this.sassAutocompilerWindowsView.serialize()
    };
  },

  toggle() {
    console.log('SassAutocompilerWindows was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  startWatcher() {
      let exec = require('child_process').exec;
      let sass_ext = /\.sass$|\.scss$/i;
      let sass_file = atom.workspace.getActiveTextEditor().getFileName();

      if(typeof sass_file == "string" && sass_ext.test(sass_file.toLowerCase())){
          let sass_path = atom.workspace.getActiveTextEditor().getPath();
          let css_file = sass_file.replace(sass_ext, '.css');
          let watch_start = false;
          
          for(let i = 0; i < atom.workspace.getTextEditors().length; i++){
              let file = atom.workspace.getTextEditors()[i];
              
              if(css_file == file.getFileName()){
                  let exec_command = "sass --no-cache --sourcemap=none --style=expanded --watch "+sass_path+":"+file.getPath();
                  exec("start cmd /k "+exec_command);
                  watch_start = true;
                  atom.notifications.addSuccess('Watcher started correctly, in order to stop it press Ctrl+c on the Command Prompt', {dismissable: false});
              }
          }
          
          if(!watch_start){
              atom.notifications.addError('No css file found, make the target css file open and the name match the sass file name', {dismissable: true});
          }
      }
      else{
          atom.notifications.addError('Make sure that you run this command on a sass file!', {dismissable: true});
      }
  }

};
