import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		const links = this.get('links');
		return {
			searchTypes: links.getSearchTypes(),
			emailValidation: {
				invalid: false,
				hasError: Ember.computed('invalid', function(){
					debugger;
					return this.get('invalid');
				}),
				message: "Please provide a valid email."
			}
		};
	},

	actions: {
		searchEmail: function(form){
			var email = form.email;
			var self = this;
			if(form.email) {
				var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if(regex.test(form.email)){
					self.model().emailValidation.invalid = false;
					self.transitionTo('search', {queryParams: {email: form.email}});
				} else {
					self.model().emailValidation.invalid = true;
				}
				var model = self.model();
			}
	    	
	    }
	},

    links: Ember.inject.service()

});

 
