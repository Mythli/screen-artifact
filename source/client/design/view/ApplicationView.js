App.ApplicationView = Ember.View.extend({
	didInsertElement: function() {
		this.$().find('.focus-submit .input').on('focusin', function(element) {
			$(this).parent('.focus-submit').addClass('focus');
		});

		this.$().find('.focus-submit .input').on('focusout', function(element) {
			$(this).parent('.focus-submit').removeClass('focus');
		});
	}
});