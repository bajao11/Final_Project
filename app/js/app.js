$(function() {

    var clientHost = 'http://localhost:8000';
    var server = 'http://pupcoetm.appspot.com/api';
    var app = {
        init: function() {
            this.user = {};
            $('.menu-loading').removeClass('hidden');
            $('.menu-user').addClass('hidden');
            $('.btn-login').addClass('hidden');

            $('.btn-login').attr('href', server + '/login?url=' + clientHost);
            $('.btn-logout').attr('href', server + '/logout?url=' + clientHost);

            this.getUser();
        },
        getUser: function() {
            var self = this;
            $.ajax({
                method: 'GET',
                url: server + '/users/me',

                // user is already signed in
                success: function(me) {
                    console.log(me);
                    self.user = me;
                    self.showLogout();
                },

                error: function(err) {
                    console.log('you have not authenticated');
                    self.showLogin();
                }
            });
        },
        showLogin: function() {
           $('.menu-loading').addClass('hidden');
           $('.menu-user').addClass('hidden');
           $('.btn-login').removeClass('hidden');
        },
        showLogout: function() {
           $('.user-email').text(this.user.email);
           $('.menu-loading').addClass('hidden');
           $('.btn-login').addClass('hidden');
           $('.menu-user').removeClass('hidden');
        }
    };

    function getTemplate(template_id, context) {
        var template, $template, markup;
        template = $('#' + template_id);
        $template = Handlebars.compile(template.html());
        markup = $template(context);
        return markup;

    }

    app.init();

});