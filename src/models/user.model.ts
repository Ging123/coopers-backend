import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface user {
  username:string;
  password:string;
}

class UserModel {

  private readonly userSchema = new Schema({
    username: {
      type:String,
      required:true,
      maxLength:30,
      index:true,
      unique:true
    },
    password: {
      type:String,
      index:true,
      required:true,
      maxlength:100
    },
    token: {
      type:String
    }
  },
  {
    timestamps: true
  });


  protected readonly userModel = mongoose.models.user || mongoose.model('user', this.userSchema);


  protected createUser(userData:user) {
    return new this.userModel({
      ...userData,
      token:''
    });
  }
}

export default UserModel;