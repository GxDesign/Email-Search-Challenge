import Ember from 'ember';

export default Ember.Route.extend({
	searchResults: Ember.inject.service('search-results'),
	
	beforeModel: function(transition) {
		const searchResults = this.get('searchResults');
		var applicationController = this.controllerFor('application');
        
		// check is authToken exists
		if (!localStorage.authToken) {
		  applicationController.set('savedTransition', transition);
		  this.transitionTo('login');
		} else {
		  applicationController.login();  

		    // parse any queryparams in case of page reload
		    if(transition.queryParams.email){
			  var report = searchResults.getSearchResults(transition.queryParams.email);  
			  this.controllerFor('search').set("report", report);
			}
		} 
	},
	model( params, transition ) {
		return {
			query: transition.queryParams.email
		}
	}
});
