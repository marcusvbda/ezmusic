export class AjaxProvider
{
    constructor()
    {
        // 
    }

    public get(url)
    {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, false);
        oReq.send(null);
        return oReq.responseText;
    }
    

  


}