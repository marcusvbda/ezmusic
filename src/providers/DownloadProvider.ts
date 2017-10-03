export class DownloadProvider
{
  
    private stack:any = [];
    constructor()
    {
        // 
    }

    public add(item)
    {
        this.stack.push(item);
    }

    public get()
    {
        return this.stack;
    }

    public removeFirst()
    {
        this.stack.shift();
    }

  


}