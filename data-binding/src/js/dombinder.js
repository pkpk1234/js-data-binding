//flow
import Engine from "./engine";
import Binder from "./binder";
import engine from "./engine";

class DomBinder {
  constructor(idSelector: string, initObject: Object) {
    let element = document.querySelector(idSelector);
    if (element != null) {
      let propNames = Object.keys(initObject);
      let template = element.innerHTML;
      let renderObj = engine.compile(template);
      let dataBinder = new Binder();
      propNames.forEach(propName => {
        dataBinder.subcribe(
          propName,
          refreshDom(element, renderObj.renderFunction)
        );
      });
    } else {
      throw new Error("no such element " + idSelector);
    }
  }
}

function refreshDom(idElement: Object, renderFunction: Function):Function {
  return function(currentStateObject: Object) {
    let html = renderFunction.call(undefined, currentStateObject);
    idElement.innerHTML = renderFunction.call(undefined, currentStateObject);
  };
}

export default DomBinder;
