class WeirdoJS {
  constructor() {
    this.boilerplate = `<div id = 'console'></div><br>><input id = 'prompto'> </input>`;
    this.hasInjected = false;
    this.commands = {}
    this.command = '';
    this.dynams = [];

    this.vars = {};
  }
  setOrInitVar(varName, varValue) {
    this.vars[varName] = varValue;
  }
  getVar(varName) {
    return this.vars[varName];
  }
  itemInList(it, list) {
    let inl = false;
    for (var i = 0; i <= list.length - 1; i++) {
      if (list[i] == it) {
        inl = true;
      }
    }
    return inl
  }
  process() {
    let cmd = this.command;

    console.log(this.itemInList(cmd.split(':')[0], this.dynams))

    if (this.itemInList(cmd.split(':')[0], this.dynams)) {
      this.commands[cmd.split(':')[0]](cmd.split(":")[1])
      return;
    }

    if (this.commands[cmd] == null) {
      this.insert("Invalid command: " + cmd, 'red');
    } else {
      this.commands[cmd]()
    }
  }
  init() {
    if (!this.hasInjected) {
      document.body.innerHTML += this.boilerplate;
      let copy = this;
      this.prompt = document.getElementById('prompto');
      this.console = document.getElementById("console");
      this.prompt.addEventListener('keydown', function (event) {
        if (event.keyCode == 13) {
          copy.command = this.value;
          console.log("The keydown listener fired.")
          copy.process();
          this.value = "";
        }
      })
    } else {
      console.error("You injected this boilerplate once, I wouldn't recommend injecting it twice.")
    }
  }
  addNewCommand(commandName, effect) {
    this.commands[commandName] = effect;
  }
  insert(text, color) {
    let toInject = document.createElement('span');
    toInject.innerHTML = '<br>' + text;
    toInject.style.color = color;
    this.console.appendChild(toInject);
  }
  applyCSS() {
    this.console.style.height = "500px";
    document.body.style.overflow = 'hidden';
    this.console.style.overflowY = "auto";
    this.console.style.fontFamily = "'Share Tech Mono', monospace";
    this.prompt.style.textAlign = "left";
    this.prompt.style.fontFamily = "'Share Tech Mono', monospace";

    this.console.style.border = "0px solid transparent";
    this.prompt.style.border = "0px solid transparent";

    this.console.style.outline = "0px solid transparent";
    this.prompt.style.outline = "0px solid transparent";

    document.body.style.fontSize = "15px";
    this.prompt.style.backgroundColor = 'black';
    this.console.style.backgroundColor = 'black';
    document.body.style.backgroundColor = 'black';


    this.prompt.style.color = 'white';
    this.console.style.color = 'white';
    this.console.style.textAlign = 'center';
    document.body.style.textAlign = 'center';
    document.body.style.color = 'white';
  }
  addNewDynamicCommand(cmdRoot, effect) {
    this.commands[cmdRoot] = function (par) { effect(par) };
    this.dynams.push(cmdRoot);
  }
  clean() {
    this.console.innerHTML = "";
  }
}
