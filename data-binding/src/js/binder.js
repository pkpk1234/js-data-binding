//flow

class Binder {
    const propertyWatchFunctionMap:Map;
    constructor Binder() {
        propertyWatchFunctionMap = new Map();
    }
    bindCallBack(propertyName:string,callBack:Function):void {
        if(this.propertyWatchFunctionMap.hasKey(propertyName)) {
            this.propertyWatchFunctionMap.push(callBack);
        } else {
            this.propertyWatchFunctionMap.set(propertyName,[callBack]);
        }
    }
    bindObject(obj:Object):void {
        for(const [propertyName, callBackArray] of this.propertyWatchFunctionMap) {
            Object.defineProperty(obj,propertyName,{
                set:function() {
                    callBackArray.forEach(function(callBack) {
                        callBack.call(null,{propertyName,});
                    });
                }
            });
        }
    }
}
