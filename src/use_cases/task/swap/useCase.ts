import exception from "../../../utils/exception";
import Base from "../base";

class SwapTaskFromListsUseCase extends Base { 

  public async swapFromList(user:any, indexOfTask:number, oldList:string, 
  newList:string) {
    this.validate(indexOfTask, oldList, newList);
    await this.user.swapTaskFromList(user, indexOfTask, oldList, newList);
  }


  private validate(indexOfTask:number, oldList:string, newList:string) {
    this.validateTaskIndex(indexOfTask);
    this.validateListName(oldList);
    this.validateListName(newList);
  }


  private validateTaskIndex(taskIndex:number) {
    if(!taskIndex && taskIndex !== 0) throw exception("This task doesn't exist");
  }


  private validateListName(listName:string) {
    if(!listName) throw exception("Empty list name");
    const lenGreaterThanAllowed = this.validator.isGreaterThanMaxLength(listName, 30);
    if(lenGreaterThanAllowed) throw exception("List name must be less than 30 in length");
  }
}

export default SwapTaskFromListsUseCase;