import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(transition) {
		var username = localStorage.activeUser;
        var recentSearches;

		// get recent searches on refresh
		if(localStorage[username + "_reports"]){
			recentSearches = JSON.parse(localStorage[username  + "_reports"]);
			recentSearches  =  recentSearches.sort(function(a,b){
			  return new Date(b.created_at) - new Date(a.created_at);
			});
		} else {
			recentSearches = [];
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