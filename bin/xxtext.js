

var xxtext = async function(ctx){


  if(typeof (ctx.request.body)!='undefined'){
    let reb = deepClone(ctx.request.body)
    for(let i in reb){
        reb[i] = reb[i].replace(/[^A-z][^0-9][^~!@#$%^&*]/g,'')
      //await console.log(reb[i])
    }
    return(reb)

  }else {
    await console.log('req.body is null')
  }


}


function deepClone(obj){
  var result;
  var oClass=isClass(obj);
  if(oClass==="Object"){
    result={};
  }else if(oClass==="Array"){
    result=[];
  }else{
    return obj;
  }
  for(var key in obj){
    var copy=obj[key];
    if(isClass(copy)=="Object"){
      result[key]=arguments.callee(copy);//递归调用
    }else if(isClass(copy)=="Array"){
      result[key]=arguments.callee(copy);
    }else{
      result[key]=obj[key];
    }
  }
  return result;
}

//判断对象的数据类型
function isClass(o){
  if(o===null) return "Null";
  if(o===undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8,-1);
}










module.exports = xxtext