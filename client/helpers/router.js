Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {return Meteor.subscribe('posts')}
});

Router.map( function(){
	this.route('postsList', {path: '/'});

	this.route('postSubmit', { path: '/submit'});

	this.route('postPage', {
		path: 'posts/:_id',
		data: function() { return Posts.findOne(this.params._id); }
	});

	this.route('postEdit', {
		path: 'posts/:_id/edit',
		data: function() { 
			Session.set('currentPostId', this.params._id); 
			return Posts.findOne(this.params._id); 
		}
	});
});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		}
		else {
			this.render('accessDenied');
		}
		this.pause();
	}
}

Router.onBeforeAction(requireLogin, {only: 'postSubmit'})