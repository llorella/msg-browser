# ll-browser
generate a lean web ui for exploring message records, documentation of text interactions 

![Screenshot from 2024-04-04 22-22-46](https://github.com/llorella/msg-browser/assets/110218399/f8f20783-faf2-4738-930d-03f6e7c14388)

### relation with llt 
git clone `llt` main repo (https://github.com/llorella/llt)

ll-browser was initialized by an `llt` command run by the author, in need of a usable ui for inspecting data (language log json files). After a compressed sequence of commands run in successful `llt` interactive session, a workable project was initialized in the form of 3 files: `server.ts`, `public/index.html`, and `run.sh`. Many manual code changes and continued prompting occured afterwards.

```bash
llt -l ll_browser.ll -t 0.5 -p "$(ls ~/.llt/ll/*.ll)\nDesign an extremely minimal ui with vanilla typescript and html for browsing language log files listed previously."
```

ll file groupings viewable in the ui can be dynamically set that combines a simple bash command `ls` on directory of ll files, and prepends its output to an `llt` command that asks a model to group the files into a user defined range (5 by default). 
```bash
llt -l update_config.ll --exec_dir ~/.llt/exec/ll_browser -t 0.7 -m gpt-4-0125-preview -f ~/.llt/exec/ll_browser/public/config.js -p "$(ls ~/.llt/ll/*.ll)\nPlease update the groupings in public/config.js. Return entire file. Use less than 9 groups."
```
![image](https://github.com/llorella/msg-browser/assets/110218399/a99b834b-348f-401c-b760-437be58a06bc)

Due to the flexibility of `llt`, parallel execution is available through a simple implementation (see LLT_RUN_PARALLEL_PY_URL_HERE). Varying parameters can be set and logged every action executed inside of `llt`'s default interactive shell mode. `-n || --non_interactive` can be set, and is a required flag for aforementioned parallel execution plugin. External wrappers can also be designed, but interfacing with `llt`'s minimal requirements for `llt` plugin list and command usage is highly encouraged, especially with better capabilities author expects from near future. 

