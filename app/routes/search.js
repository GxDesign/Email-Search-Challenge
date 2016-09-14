import Ember from 'ember';

export default Ember.Route.extend({
	model( params, transition ) {
		const email = transition.queryParams.email;
	  	const results = this.get('results');
	  	return results.getSearchResults(email);
	},

    results: Ember.inject.service('search-results')
});
