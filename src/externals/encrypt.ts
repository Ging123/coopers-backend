import bcrypt from 'bcrypt';

class Bcrypt {

  public async hash(value:string, salt:string) {
    value += salt;
    return await bcrypt.hash(value, 10);
  }

  public async compare(valuePlan:string, valueHashed:string, salt:string) {
    valuePlan += salt;
    return await bcrypt.compare(valuePlan, valueHashed);
  }
}

export default Bcrypt;