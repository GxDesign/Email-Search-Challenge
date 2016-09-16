import Ember from 'ember';

export default Ember.Route.extend({
	searchResults: Ember.inject.service('search-results'),
	
	beforeModel: function(transition) {
		const searchResults = this.get('searchResults');
		var applicationController = this.controllerFor('application');
		var self = this;
        
		// check is authToken exists
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
				        self.controllerFor('search').set("report", result);
	  	            	self.controllerFor('application').set("loading", false);
				    }
				    // code error handler here
				}); 
			}
		} 
	},
	model( params, transition ) {
		return {
			query: transition.queryParams.email
		}
	}
});
