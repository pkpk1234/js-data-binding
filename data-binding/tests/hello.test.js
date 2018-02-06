import Binder from "../src/js/binder"

test("Test Engine", () => {
    const binder = new Binder();
    let render =
        new Function("","console.log(a+b) ");

    let obj = {"a":1,"b":2};
    binder.bindCallBack("a",render);
    binder.bindCallBack("b",render);
    binder.bindObject(obj);
    obj.a = 10;
    obj.b = 20;
});