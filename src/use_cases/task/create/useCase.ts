import exception from "../../../utils/exception";
import Base from "../base";

class CreateTaskUseCase extends Base {

  public async create(user:any, text:string, listName:string) {
    this.validateText(text);
    this.validateListName(listName);
    await this.user.addTask(user, text, listName);
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

export default CreateTaskUseCase;