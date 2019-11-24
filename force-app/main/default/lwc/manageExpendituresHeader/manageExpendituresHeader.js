import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class ManageExpendituresHeader extends NavigationMixin(
  LightningElement
) {
  @api parentname;
  @api parentid;
  @track url;
  @track accountHomePageRef;

  connectedCallback() {
    // Store the PageReference in a variable to use in handleClick.
    // This is a plain Javascript object that conforms to the
    // PageReference type by including "type" and "attributes" properties.
    // The "state" property is optional.
    this.accountHomePageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "home"
      }
    };
    this[NavigationMixin.GenerateUrl](this.accountHomePageRef).then(
      url => (this.url = url)
    );
  }

  handleCancel(evt) {
    // Stop the event's default behavior.
    // Stop the event from bubbling up in the DOM.
    console.log(JSON.stringify(this.accountHomePageRef));
    evt.preventDefault();
    evt.stopPropagation();
    // Navigate to the Account Home page.
    this[NavigationMixin.Navigate](this.accountHomePageRef);
    console.log('end of handler');
  }
}
