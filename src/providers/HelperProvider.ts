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
    value = value.replace("H", " Hour: ");
    value = value.replace("M", " Minutes: ");
    value = value.replace("S", " Seconds");
    return value;
  }


}