import Ember from 'ember';

export default Ember.Route.extend({
	searchResults: Ember.inject.service('search-results'),

	beforeModel: function(transition) {
		var self = this; 
		const searchResults = this.get('searchResults');
		var applicationController = this.controllerFor('application');

		// check if the user has an authToken. We would also check the validity of the token in a live app
		if (!localStorage.authToken) {
		  applicationController.set('savedTransition', transition);
		  self.transitionTo('login');
		} else {
		    applicationController.login();  

		 
		    self.controllerFor('application').set("loading", true);

		    // parse any queryparams in case of page reload
		    if(transition.queryParams.email){
		        // get results, then stop the loader
		  	    // we know its a single object
	            searchResults.getSearchResults(transition.queryParams.email, function(result) {
				    if (result) {
				        self.controllerFor('report').set("report", result);
	  	            	self.controllerFor('application').set("loading", false);
				    }
				    // code error handler here
				}); 
			}
	    }
	}
});
