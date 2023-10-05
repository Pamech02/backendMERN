const moment = require('moment')

const isDate = (value)=>{
    if(!value){
        return false
    }
    //pude dar erro al momento de conectar con el front moment(value)
    const date = moment(value, "MM-DD-YYYY");
    if(date.isValid()){
        return true
    }else{
        return false
    }
}

module.exports={
    isDate
}