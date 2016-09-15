import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(transition) {
		var username = localStorage.activeUser;

		// get recent searches on refresh
		if(localStorage[username + "_reports"]){
			var recentSearches = JSON.parse(localStorage[username  + "_reports"]);
		} else {
			var recentSearches = [];
		}

		this.controllerFor('index').setProperties({
			username: username,
			recentSearches: recentSearches
		});

		if (!localStorage.authToken) {
		  this.controllerFor('application').set('savedTransition', transition);
		  this.transitionTo('login');
		} else {
		  this.controllerFor('application').login();      
		}
	},
	actions: {
		logout: function() {
			this.controllerFor('application').logout();
		    delete localStorage.authToken;
		    this.transitionTo('login');
		}
	}
});