import Ember from 'ember';

export default Ember.Component.extend({
	routing: Ember.inject.service(),
	actions: {
		toggleSearchPanel: function(panel_id) {	
			panel_id = "#" + panel_id;
			if(!($(panel_id).parent().hasClass("disabled"))){
				$(panel_id).parent().nextAll().removeClass("active");
				$(panel_id).parent().toggleClass("active");
				$(panel_id + "-panel").nextAll().slideUp();
				$(panel_id + "-panel").toggleClass("active");
				$(panel_id + "-panel").slideToggle();
			};
		}
	}
});

