import Ember from 'ember';

export default Ember.Route.extend({
	searchResults: Ember.inject.service('search-results'),

	beforeModel: function(transition) {
		const searchResults = this.get('searchResults');
		var applicationController = this.controllerFor('application');

		// check if the user has an authToken. We would also check the validity of the token in a live app
		if (!localStorage.authToken) {
		  applicationController.set('savedTransition', transition);
		  this.transitionTo('login');
		} else {
		  applicationController.login();  

		  // parse any queryparams in case of page reload
		  var report = searchResults.getSearchResults(transition.queryParams.email);  
		  this.controllerFor('report').set("report", report);
		}
	}
});
