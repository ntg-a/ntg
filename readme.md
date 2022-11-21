install
```
npm i --omit=dev
```

login
```
echo TWT_API_KEY=... > .env
echo TWT_API_SECRET=... >> .env
echo TWT_ACCESS_TOKEN=... >> .env
echo TWT_ACCESS_SECRET=... >> .env

node . bearer \& userid

echo TWT_BEARER_TOKEN=... >> .env
echo TWT_USER_ID=... >> .env

rm -rf data
node . sync
```

web
```
node .
http://localhost:8080
```

trm
```
node . <cmd> <arg>

node .
> help
> help <cmd>
> <cmd> <arg>
> <cmd> <arg> | <cmd> <arg>
> <cmd> <arg> & <cmd> <arg>
> <cmd> <arg> \
> <arg>
```

cmd
```
> echo a | echo b & echo c
"a"
"b"
"c"

> echo a || echo b && echo c
"a | echo b & echo c"



> head 2 | head 1 | count
"1"

> head 2 | head 1 & count
"2"

> head 2 & head 1 | count
"3"



> echo a\
> b\\
> 
> c
"a
b

c"

> echo a\<space>
"a\"
```

build
```
npm i --include=dev
npm i -g typescript tsc-alias
tsc && tsc-alias -f
```
