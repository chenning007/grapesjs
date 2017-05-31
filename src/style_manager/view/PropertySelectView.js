define(function(require, exports, module){
  'use strict';
  var Backbone = require('backbone');
  var PropertyView = require('./PropertyView');
  var propertyTemplate = require('text!./../templates/propertySelect.html');
  /**
   * @class PropertySelectView
   * */
  module.exports = PropertyView.extend({

    template: _.template(propertyTemplate),

    initialize: function(options) {
      PropertyView.prototype.initialize.apply(this, arguments);
      this.list = this.model.get('list') || [];
    },

    /** @inheritdoc */
    renderInput: function() {
      var pfx  = this.pfx;
      if(!this.$input){
        var input = '<select>';

        if (this.list && this.list.length) {
          _.each(this.list, function(el) {
            var name = el.name ? el.name : el.value;
            var style = el.style ? el.style.replace(/"/g,'&quot;') : '';
            var styleAttr = style ? 'style="' + style + '"' : '';
            input += '<option value="'+el.value.replace(/"/g,'&quot;')+'" ' + styleAttr + '>'+name+'</option>';
          });
        }

        input += '</select>';
        this.input = input;
        this.$input = $(this.input);
        this.$el.find('#'+ pfx +'input-holder').html(this.$input);
      }
      this.setValue(this.componentValue, 0);
    },

  });
});