export default class GridController{
  constructor(gridService){
    this.gridService = gridService;
  }

  getMessage(){
    return this.gridService.getMessage();
  }
}

GridController.$inject = ["gridService"];
