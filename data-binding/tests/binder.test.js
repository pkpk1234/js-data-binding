import Binder from "../src/js/binder"

test("Test binder", () => {
    const binder = new Binder();
    let render =
        new Function("context"," console.log('a+b = '+(context.a+context.b));with(context){return a+b}");
    binder.subcribe("a",render);
    binder.subcribe("b",render);
    let obj = binder.bindObject({"a":1,"b":2});
    obj.a = 10;
    obj.b = 20;
});