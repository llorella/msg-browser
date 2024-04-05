# ll-browser
generate a lean web ui for exploring message records, documentation of text interactions 

### relation with llt
ll-browser was initialized by llt process run by repo author on a Linux box. 
```bash
cat update_groupings.sh | copy
```

ll file groupings viewable in the ui can be dynamically set that combines a simple bash command `ls` on directory of ll files, and prepends its output to an `llt` command that asks a model to group the files into a user defined range (5 by default). 
```bash
llt -l update_config.ll --exec_dir ~/.llt/exec/ll_browser -t 0.7 -m gpt-4-0125-preview -f ~/.llt/exec/ll_browser/public/config.js -p "$(ls ~/.llt/ll/*.ll)\nPlease update the groupings in public/config.js. Return entire file."
```
Due to the flexibility of `llt`, parallel execution is available through a simple implementation (see LLT_RUN_PARALLEL_PY_URL_HERE). Varying parameters can be set and logged every action executed inside of `llt`'s default interactive shell mode. `-n || --non_interactive` can be set, and is a required flag for aforementioned parallel execution plugin. External wrappers can also be designed, but interfacing with `llt`'s minimal requirements for `llt` plugin list and command usage is highly encouraged, especially with better capabilities author expects from near future. 

