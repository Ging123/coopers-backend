import exception from '../utils/exception';
import jwt from 'jsonwebtoken';

class Jwt {

  private secretKeyOfToken:string;
  private expireIn:string;
  
  constructor(secretKeyOfToken:string, expireIn='24h') {
    this.secretKeyOfToken = secretKeyOfToken;
    this.expireIn = expireIn;
  }


  public create(data:object) {
    //const expireTime = { expiresIn:this.expireIn };
    const token = jwt.sign(data, this.secretKeyOfToken);
    return token;
  }


  public validate(token:string) {
    let tokenData:any;
    if(!token) throw exception('Empty token', 401);
    jwt.verify(token, this.secretKeyOfToken, (err, data:any) => {
      if(err) throw exception('Token invalid or expired', 401);
      tokenData = data;
    });
    return tokenData;
  }
}

export default Jwt;