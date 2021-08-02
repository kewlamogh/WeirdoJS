class WeirdoJS {
  constructor(showClearMessage = true, debug = false) {
    this.boilerplate = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet"><div id = 'console'></div><br>><input id = 'prompto'> </input>`;
    this.hasInjected = false;
    this.commands = {}
    this.command = '';
    this.debug = debug;
    this.dynams = [];
    this.showClearMessage = showClearMessage;

    this.lsVars = [];
  }

  editVar(varName, val) {
    this.lsVars[varName] = val;
  }

  getVar(varName) {
    return this.lsVars[varName];
  }

  error(errorName) {
    this.insert(errorName, "red");
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


  localUpdate() {
    for (var oof in this.lsVars) {
      let value = this.lsVars[oof];
      localStorage.setItem(oof, JSON.stringify(value));
    }
  }

  getLsVar(varName) {
    let res = localStorage.getItem(varName);
    if (res != null) {
      res = JSON.parse(res);
    }
    return res;
  }

  process() {
    let cmd = this.command;

    if (this.debug) {
      console.log(this.itemInList(cmd.split(':')[0], this.dynams))
    }

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
          if (this.debug) {
            console.log("The keydown listener fired.")
          }
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
  wait(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    )
  }
  clean() {
    this.console.innerHTML = "";
    if (this.showClearMessage) {
      this.insert("Console Cleared", "lightgray");
    }
  }
  parse(thing, sep) {
    return thing.split(sep);
  }
}

