import Ember from 'ember';

// created to handle queryparams when searching

export default Ember.Controller.extend({
	queryParams: ['email'],
    email: null
});