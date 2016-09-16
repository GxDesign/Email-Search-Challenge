import Ember from 'ember';

export default Ember.Route.extend({
	model() {	
		const links = this.get('links');
		return {
			searchTypes: links.getSearchTypes()
		};
	},
	actions: {
		routeToSearch: function(query) {
			this.transitionTo('search', {queryParams: {email: query }});
		},
		startLoading: function() {
			this.controllerFor('application').set("loading", true);
		},
		stopLoading: function() {
			this.controllerFor('application').set("loading", false);
		},
		passReportToSearch: function(report){
			this.controllerFor('search').set("report", report);
		}
	},

    links: Ember.inject.service()

});

 
