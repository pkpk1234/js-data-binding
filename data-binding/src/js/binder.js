//flow

class Binder {
    
    constructor() {
        this.propertyWatchFunctionMap = new Map();
    }
    bindCallBack(propertyName:string,callBack:Function):void {
        if(this.propertyWatchFunctionMap.has(propertyName)) {
            this.propertyWatchFunctionMap.get(propertyName).add(callBack);
        } else {
            this.propertyWatchFunctionMap.set(propertyName,new Set([callBack]));
        }
    }
    bindObject(obj:Object):void {
        for(const [propertyName, callBackArray] of this.propertyWatchFunctionMap) {
            Object.defineProperty(obj,propertyName,{
                set:function(newValue) {
                    obj.propertyName = newValue;
                    callBackArray.forEach(function(callBack) {
                        console.log(propertyName+"="+obj.propertyName);
                        console.log(callBack);
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