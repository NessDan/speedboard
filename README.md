# Speedboard

Finding the fastest keyboard layout.

Go on MonkeyType, set mode to Zen, then after a quick session, submit what you wrote then in you Chrome console paste this:

```
let zenny;
zenny = JSON.parse(localStorage.getItem("zenny")) || [];
zenny.push(JSON.parse(replay()));
zenny = JSON.stringify(zenny);
localStorage.setItem("zenny", zenny);
JSON.parse(localStorage.getItem("zenny"));
```
