//flow
import Engine from "./engine";
import Binder from "./binder";
import engine from "./engine";

class DomBinder {
  constructor(idSelector: string, initObject: Object) {
    debugger;
    let element = document.querySelector(idSelector);
    if (element != null) {
      let propNames = Object.keys(initObject);
      let template = element.innerHTML;
      let renderObj = engine.compile(template);
      (refreshDom(element, renderObj.render))(initObject);

      let dataBinder = new Binder();
      propNames.forEach(propName => {
        dataBinder.subcribe(
          propName,
          refreshDom(element, renderObj.render)
        );
      });
      
    } else {
      throw new Error("no such element " + idSelector);
    }
  }
}

function refreshDom(idElement: Object, renderFunction: Function):Function {
  
  return function(currentStateObject: Object) {
    debugger;
    let html = renderFunction.call(undefined, currentStateObject);
    idElement.innerHTML = html;
  };
}

export default DomBinder;
