import Ember from 'ember';

export default Ember.Component.extend({

	routing: Ember.inject.service('routing'),
	searchResults: Ember.inject.service('search-results'),

	emailValidator: { // bound property, used for showing error msg
		invalid: false, 
		message: "Please provide a valid email in order to search."
	},
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
		},
		searchEmail: function(form){
			var email = form.email;
			var self = this;
			if(form.email) {
				var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if(regex.test(form.email)){
                    $(".tab-pane").slideUp();
                    $(".nav-tabs li").removeClass("active");

					self.set('emailValidator.invalid', false);
	  	            const searchResults = this.get('searchResults');

	  	            // start loader 
				  	self.sendAction('startLoading');

                    // get results, then stop the loader
				  	// we know its a single object
	  	            searchResults.getSearchResults(form.email, function(result) {
					    if (result) {
					        self.sendAction('passReportToSearch', result);
		  	            	self.sendAction('stopLoading');
					    }
					    // code error handler here
					});

	  	         //    // using timeout to show off loader. needs a promise
	  	         //    setTimeout(function(){
		  	        //     self.sendAction('stopLoading');
		  	        // }, 2000);

		  	        self.sendAction('passReportToSearch', report);

					// cant transition, send action to application router
					self.sendAction('routeToSearch', form.email);

				} else {
					self.set('emailValidator.invalid', true);
				}
			}
		}
	}


});

