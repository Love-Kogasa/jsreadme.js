/***
 * 用于生成README文本的函数
 * ! This Setting isnt same as package.json from npm 这个设置和NPM的package.json不一样！！！
 * @param {*} lib - 导出的变量
 * @param {object} setting - 设置，建议每个项目生成README时都包含name(项目名)和objname(导出变量的变量名)属性
 * @return {string} 返回Readme文本
 */
function jsreadme( lib, setting = {} ){
   var key, readme = []
   readme.push( "# " + ( setting.name || "ProjectName" ))
   setting.description && readme.push( setting.description.split( "\n" ).join( "  \n" ) )
   if( typeof setting.license === "object" ){
      readme.push( "# License" )
      readme.push( "```\n" + 
         setting.license.split( "\n" ).join( "  \n" ) +
      "```" )
   }
   readme.push( "***" )
   value( setting.objname || "MainName", lib )
   readme.push( "***" )
   setting.author && readme.push( "*Authors* : " + setting.author.join( " " ) )
   setting.version && readme.push( "*Version* : " + setting.version.join( "." ) )
   setting.repo && readme.push( "*Repository* : " + setting.repo )
   return readme.join( "  \n" )
   function toExampleFunc( func ){
      if( func.toString().match( /[0-9a-zA-Z_\$]+\([^\)]*\)\{/ ) ){
         return func.toString().slice( 0, func.toString().indexOf( "){" ) + 1 )
      } else {
         return func.toString().slice( 0, func.toString().indexOf( "=>" ) + 1 )
      }
   }
   function listfor( object ){
      var newObj = {}, objs = {}
      for( let key of Object.keys( object ) ){
         if( typeof object[key] === "object" ){
            objs[ key ] = object[ key ]
         } else {
            newObj[ key ] = object[key]
         }
      }
      return { ...newObj, ...objs }
   }
   function value( name, val, sub = "#" ){
      if( typeof val === "object" ){
         readme.push( `${sub} **object** ${name}` )
         for( let key of Object.keys( listfor( val ) ) ){
            valu = val[key]
            value( key, valu, sub + "#" )
         }
      } else if( typeof val == "function" ){
         readme.push( `* **function** ${name}` )
         readme.push( "```js\n" +
            toExampleFunc( val ) +
         "{...}\n```")
      } else {
         readme.push( `* **${typeof val}** ${name}\ndefault: \`${JSON.stringify(val)}\`` )
      }
   }
}

if( typeof module === "object" ) module.exports = jsreadme