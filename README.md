# Hello! I made a JS framework called...
# WeirdoJS!
WeirdoJS is a simple JS framework that makes making web-terminal bots, assistants, and games easier. 
## Setup
```html
<!--Insert this script-->
<script src = 'https://weirdojs.amoghthecool.repl.co/weirdo.js'> </script>
```
That is weirdo js. Next, go to your main JavaScript file and create a new instance of `WeirdoJS`. Then do this setup:
```js
let weirdo = new WeirdoJS();
weirdo.init();
weirdo.applyCSS();
```
## Creating commands
> To output things into the command line, just do `WeirdoJS.insert("text", "css_color_or_hex_or_rgb")`

To create a simple command like `help` or `clear`, just type this:
```js
weirdo.addNewCommand("help", function () {
  weirdo.clean();
  weirdo.insert("Hai I am helpar bot!", "green")
})
```

> Protip: To clear the console easily, just do `WeirdoJS.clean();`

## Using WeirdoVars (beta) 
WeirdoVars is a dict of variables that make using `localStorage` easy!
```js
weirdo.editVar("foo", "bar");
weirdo.localUpdate(); //creates and updates local storage. 
```
At the beginnings of programs, use `weirdo.getLsVar()` to get the localStorage variable, if it is not null. If it is null, the function will return null (or void maybe idk).
## Dynamic commands
To make dynamic commands (basically commands that take in ONLY ONE parameter), then do this:
>Note, `:` is not allowed in the dynamic command's name.

```js
weirdo.addNewDynamicCommand("Say hello to ", function (parameter) {
  weirdo.insert(parameter, "white");
})
```
When the user types a command like `Say hello to :Bob`, it will output `Bob`.

>Note, to create multiple parameters, use `WeirdoJS.parse("text", "separator")` and parse the parameter. This will return a list of parameters.

> Note#2, you can use plain JS too inside the command bodies.

## Demo
You can find a demo [here](https://weirdodemo.amoghthecool.repl.co/) and the source code for the demo [here](https://replit.com/@AmoghTheCool/WeirdoDemo). 

## Contribute to Weirdo [here](https://github.com/kewlamogh/WeirdoJS)
