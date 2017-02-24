# xbuilder
An xamarin xbuild for node.js

##Install
```shell
npm install xbuilder --save
```

##Using

```nodejs

var options = {
    target:'Breeze',
    properties:{
        Configuration:'Release',
        Platform:'iPhone',
        BuildIpa:true
    },
    solutionPath:'Breeze.sln'
};

//exec command: xbuild /p:Configuration=Release /p:Platform=iPhone /p:BuildIpa=true /target:Breeze Breeze.sln

xbuild(options).then(([stdout, stderr]) => {
    //todo..
 }).catch((error) => {
     console.log('error',error);
}).finally(()=>{
    //todo..
});

```

