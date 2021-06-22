sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
   "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, JSONModel,Fragment, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("gruppo3.gruppo3.controller.WarnEmployee", {
    onInit: function(){
        	var oModel = new JSONModel(sap.ui.require.toUrl("https://services.odata.org/V2/Northwind/Northwind.svc/Employees"));
			this.getView().setModel(oModel);
          },
         
		handleValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			// create value help dialog
			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "gruppo3.gruppo3.view.Dialog",
					controller: this
				}).then(function (oValueHelpDialog) {
					oView.addDependent(oValueHelpDialog);
					return oValueHelpDialog;
				});
			}

			this._pValueHelpDialog.then(function (oValueHelpDialog) {
				// create a filter for the binding
				oValueHelpDialog.getBinding("items").filter([new Filter(
					"EmployeedID",
					FilterOperator.Contains,
					sInputValue
				)]);
				// open value help dialog filtered by the input value
				oValueHelpDialog.open(sInputValue);
			});
		},

		_handleValueHelpSearch: function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"EmployeedID",
				FilterOperator.Contains,
				sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
  
    liveChange: function( oEvent ) {
      let regex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
      if( oEvent.getParameter("value").match(regex) ){
        oEvent.getSource().setValue("");
      }
    },
    id: function(input) {
      let sSuppliers = this.getView().getModel("Employees").getData().Suppliers;
      let check = false;
      sSuppliers.forEach( obj => {
        if( input === obj.SupplierID ){
         check = true;
        }
      });
     return check;
    },

onSelect: function( oEvent ) {
      
      let ID = parseInt(oEvent.getSource().getProperty("number"));
      let input = this.byId("multiInput");
      input.setValue(ID);
      this.onDialogClose();
    }
			
                
                

			
		});
	});


