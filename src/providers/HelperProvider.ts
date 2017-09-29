export class $
{
  
  constructor()
  {
    // 
  }
  public sizeOf(obj)
  {
    return Object.keys(obj).length;
  }

  public convert2time(value)
  {
    value = value.replace("PT", "");
    value = value.replace("H", " H : ");
    value = value.replace("M", " M : ");
    value = value.replace("S", " S ");
    return value;
  }


}