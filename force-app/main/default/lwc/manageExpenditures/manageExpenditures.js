import { LightningElement, track, api } from "lwc";

export default class ManageExpenditures extends LightningElement(
  LightningElement
) {
  @api parentId;
  @api parentName;
  @api gaueString;

  @track gauExpenditures;
  @track numbers = [1];

  connectedCallback() {
    let rowId = 1;
    this.gauExpenditures = JSON.parse(this.gaueString);
    this.gauExpenditures.forEach(function(eachExpenditure) {
      eachExpenditure.rowId = rowId++;
    });
  }

  addRow() {
    let rowId = this.gauExpenditures[this.gauExpenditures.length - 1].rowId + 1;
    this.gauExpenditures.push({rowId: rowId});
  }

  handleUpdate(event) {
    let updatedRow = event.detail;

    let index = this.gauExpenditures
      .map(expenditure => {
        return expenditure.rowId;
      })
      .indexOf(updatedRow.rowId);

    this.gauExpenditures[index] = updatedRow;
  }

  handleDelete(event) {
    let deletedRow = event.detail;

    let index = this.gauExpenditures
      .map(expenditure => {
        return expenditure.rowId;
      })
      .indexOf(deletedRow.rowId);

    if (this.gauExpenditures.length > 1) {
      this.gauExpenditures.splice(index, 1);
    }
  }
}
