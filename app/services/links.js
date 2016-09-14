import Ember from 'ember';

export default Ember.Service.extend({
	getSearchTypes() {
		return [
	    		{text: "Person", icon: "user", panel_id: 'search-person', disabled: true},
	    		{text: "Phone", icon: "phone", panel_id: 'search-phone', disabled: true},
	    		{text: "Property", icon: "home", panel_id: 'search-property', disabled: true},
	    		{text: "Email", icon: "envelope", panel_id: 'search-email'}
    		]
	}
});
