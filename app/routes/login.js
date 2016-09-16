import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
	    login: function() {
	        var loginController = this.controllerFor('login'),
	            username = loginController.get('username'),
	            password = loginController.get('password');

			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

			if (regex.test(username) && password === 'BV-API-Challenge') {
                 
 				// Give access token.
				localStorage.authToken = "abc123!";
				localStorage.apiKey = "nHMapbi0co3hHH6N6IDHl8BJkDuOjQBO1nLbnNu9";
				
				// Set active User
                localStorage.activeUser = username.toLowerCase();

                
				var applicationController = this.controllerFor('application');
				var transition = applicationController.get('savedTransition');

				var recentSearches;

				if(localStorage[username + "_reports"]){
					recentSearches = JSON.parse(localStorage[username  + "_reports"]);
					recentSearches  =  recentSearches.sort(function(a,b){
					  return new Date(b.created_at) - new Date(a.created_at);
					});
				} else {
					recentSearches = [];
				}
                 
                applicationController.set("username", username);
			    this.controllerFor('index').setProperties({
					recentSearches: recentSearches,
					username: username
				});

                
				// set isLoggedIn so the UI shows the logout button
				applicationController.login();
				

				// if the user was going somewhere, send them along, otherwise
				// default to `/posts`
				if (transition) {
				  transition.retry();
				} else {
				  this.transitionTo('index');
				}
			}
	    }
	}
});