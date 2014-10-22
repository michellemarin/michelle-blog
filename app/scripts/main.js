var blogData = JSON.parse(localStorage.getItem('michelle-blog')) || {};
var apiUrl   = 'http://tiny-pizza-server.herokuapp.com/collection/michelle-blog'

var blog = function (postData) {

    return {
      template: _.template($('#post').html()),

      data: _.extend(defualts, postData),

      html: function() {return this.template(this.data);
      },

      save: function (doneCallback) {

          $.ajax({
            method: "POST",
            url: apiUrl,
            data: this.data
          }).done(doneCallback);
      }
    };
}

var addPosts = function () {
  var compiledTemplates = _.map(_.values(blogData), function (postData) {
  var blog = new Blog(postData);
  return blog.html();
});
  $('.container').html(compiledTemplates);

  };

setInterval(function () {
  addPosts();
    }, 1000);


$('.submit-field input[type=submit]').on('click', onSend);

})($);
