import exception from "../../../utils/exception";
import Base from "../base";

class EditTaskUseCase extends Base {

  public async edit(user:any, taskIndex:number, text:string, listName:string, 
  checked=false) {
    this.validate(taskIndex, text, listName);
    await this.user.editTask(user, taskIndex, text, listName, checked);
  }


  private validate(taskIndex:number, text:string, listName:string) {
    this.validateTaskIndex(taskIndex);
    this.validateText(text);
    this.validateListName(listName);
  }


  private validateTaskIndex(taskIndex:number) {
    if(!taskIndex && taskIndex !== 0) throw exception("This task doesn't exist");
  }


  private validateText(text:string) {
    if(!text) throw exception("Empty text");
    const lenGreaterThanAllowed = this.validator.isGreaterThanMaxLength(text, 300);
    if(lenGreaterThanAllowed) throw exception("Text must be less than 300 in length");
  }


  private validateListName(listName:string) {
    if(!listName) throw exception("Empty list name");
    const lenGreaterThanAllowed = this.validator.isGreaterThanMaxLength(listName, 30);
    if(lenGreaterThanAllowed) throw exception("List name must be less than 30 in length");
  }
}

export default EditTaskUseCase;