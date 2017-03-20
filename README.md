# xbuilder
An xamarin xbuild for node.js

[![Build Status](https://travis-ci.org/feiin/xbuilder.svg?branch=master)](https://travis-ci.org/feiin/xbuilder)
[![npm](https://img.shields.io/npm/dt/xbuilder.svg?maxAge=2592000)]()

## Install
```shell
npm install xbuilder --save
```

## Using

```nodejs

var options = {
    target:'Breeze',
    properties:{
        Configuration:'Release',
        Platform:'iPhone',
        BuildIpa:true
    },
    solutionPath:'Breeze.sln',
    targets:['Build']
};

//exec command: xbuild /p:Configuration=Release /p:Platform=iPhone /p:BuildIpa=true /target:Breeze Breeze.sln

xbuild(options).then((commandOptions) => {
    //todo..
 }).catch((error) => {
     console.log('error',error);
}).finally(()=>{
    //todo..
});

```

