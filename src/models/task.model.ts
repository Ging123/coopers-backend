import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface task {
  text:string;
  checked?:boolean;
}

export interface listOfTasks {
  owner:string;
  tasks:task[]
}

class TaskModel {

  private readonly taskSchema = new Schema({
    owner: {
      type:String,
      maxlength:30,
      required:true,
      index:true,
      unique:true 
    },
    tasks: {
      type:Array
    }
  },
  {
    timestamps: true
  });


  protected readonly taskModel = mongoose.models.task || mongoose.model('task', this.taskSchema);


  protected createListOfTasks(owner:string) {
    return new this.taskModel({
      owner:owner,
      tasks:[]
    });
  }
}

export default TaskModel;