const jsreadme = require( "./jsreadme" )
console.log( jsreadme( {
   method( name, value ){
      return "name : value"
   },
   method2 : () => "string",
   aString : "string",
   aObject : {
      aNumber : 1145
   },
   otherObject : {
      aNumber : 1145
   }
}, {
   name : "Example Doc",
   objname : "object",
   description : "a simple jsreadme example",
   version : [1,0,0],
   author : [ "lovekogasa" ]
}))