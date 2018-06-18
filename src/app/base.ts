export interface Base {
    get() : void;
    search(filter : any) : void;
    add( obj : any) : void;
    delete(id : any) : void;
    saveChild(child : any) : void;
    setChild(child : any) : void;
}
