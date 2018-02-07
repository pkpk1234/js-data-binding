//flow

class Binder {
    
    constructor() {
        this.propertyCallbacksMap = new Map();
    }

    subcribe(propertyName:string,callBack:Function):Binder {
        if(this.propertyCallbacksMap.has(propertyName)) {
            this.propertyCallbacksMap.get(propertyName).add(callBack);
        } else {
            this.propertyCallbacksMap.set(propertyName,new Set([callBack]));
        }
        return this;
    }

    bindObject(intiObject:Object):Object {
        let propertyCallbacksMap = this.propertyCallbacksMap;
        return new Proxy(intiObject,{
            get: function(target,propertyName) {
                return target[propertyName];
            },
            set: function(target,propertyName,newValue,receiver) {
                if(target[propertyName] !== newValue) {
                    target[propertyName] = newValue;
                    if(propertyCallbacksMap.has(propertyName)) {
                        let callBacks = propertyCallbacksMap.get(propertyName);
                        callBacks.forEach(callBack => {
                            callBack.call(undefined,target);
                        });
                    }
                }
                return true;
            }
        });
    }
}

export default Binder;