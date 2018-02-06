//flow

class Binder {
    
    constructor() {
        this.propertyWatchFunctionMap = new Map();
    }
    bindCallBack(propertyName:string,callBack:Function):void {
        if(this.propertyWatchFunctionMap.has(propertyName)) {
            this.propertyWatchFunctionMap.push(callBack);
        } else {
            this.propertyWatchFunctionMap.set(propertyName,[callBack]);
        }
    }
    bindObject(obj:Object):void {
        for(const [propertyName, callBackArray] of this.propertyWatchFunctionMap) {
            Object.defineProperty(obj,propertyName,{
                set:function(newValue) {
                    obj.propertyName = newValue;
                    callBackArray.forEach(function(callBack) {
                        console.log(obj);
                        callBack.apply(obj);
                    });
                },
                get:function() {
                    return obj.propertyName;
                }
            });
        }
    }
}

export default Binder;