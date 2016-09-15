import Ember from 'ember';

// created to handle queryparams when searching and login logic

export default Ember.Controller.extend({
	queryParams: ['email'],
    email: null,
    // used to show/hide the log out button
	isLoggedIn: false,
	loading: false,
	query: 'init',
	// when a user enters the app unauthenticated, the transition
	// to where they are going is saved off so it can be retried
	// when they have logged in.
	savedTransition: null,

	login: function() {
		this.setProperties({ savedTransition: null, isLoggedIn: true });
	},

	logout: function() {
		this.set('isLoggedIn', false);
	}
});