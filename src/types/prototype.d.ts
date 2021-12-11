type ObjForEachCallBack<T, U> = (v:T[keyof T], k:keyof T, index:number, obj:U)=>void
type ObjMapCallBack<T, C, U> = (v:T[keyof T], k:keyof T, index:number, obj:U)=>C

interface Object<T extends object = LObj> {
  forEach:(callback:ObjForEachCallBack<T, this>)=>void;
  map:<C>(callback:ObjMapCallBack<T, C, this>)=>C[];
}


interface String {
  toKebabCase:()=>string
}
