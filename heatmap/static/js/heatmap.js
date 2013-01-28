

$(document).ready(function(){

    var MouseEvent = Backbone.Model.extend({});

    var MouseEventCollection = Backbone.Collection.extend({
	model: MouseEvent,
	url: '/api/v1/mouse-events/'
    });

    var Overlay = Backbone.View.extend({
	events: {
	    'mousemove *': 'move',
	    'click #start': 'start',
	    'click #stop': 'stop',
	    'click #show': 'show',
	},

	initialize: function () {
	    
	    // Save information every 5 seconds.
	    setInterval(function () { overlay.save(); }, 5000);

	    this.recording = false;

	    // Create the complete collection and the intermediate buffer.
	    this.collection = new MouseEventCollection;
	    this.buffer = new MouseEventCollection;
	    
	},

	save: function(){

	    var that = this;
	    
	    // Save each model in the buffer and add it to the collection.
	    this.buffer.each(function(model) {
		model.save({}, {success: function (model, resp, options) {
		    model.collection.remove(model);
		    that.collection.add(model);
		}});
	    });
	},

	start: function (ev) {
	    this.recording = true;
	},

	stop: function (ev) {
	    this.recording = false;
	},

	show: function (ev) {
	    
	    // Heatmap element.
	    var el = $('<div>');

	    // Create a div for the canvas.
	    el.css('width', this.$el.css('width'));
	    el.css('height', this.$el.css('height'));
	    el.css('position', 'absolute');
	    el.css('top', this.$el[0].offsetTop);
	    el.css('left', this.$el[0].offsetLeft);
	    
	    var heatmap = heatmapFactory.create({
		element: el[0],
		opacity: 50
	    });
	    
	    heatmap.store.setDataSet({
		data: this.collection.map(function(e) { 
		    return {
			x: e.get('x'), 
			y: e.get('y')
		    };
		})});

	    el.bind('click', function () {
		el.remove();
	    });

	    this.$el.append(el);

	},

	move: function (ev) {
	    if (this.recording) {
		// alert(ev);
		if (ev.target == ev.currentTarget) {
		    this.buffer.add({
			x: ev.clientX - ev.delegateTarget.offsetLeft, 
			y: ev.clientY - ev.delegateTarget.offsetTop, 
			click: false});
		    // this.heatmap.store.addDataPoint(ev.pageX, ev.pageY);
		}
	    }
	    
	    return true;
	}
    });

    overlay = new Overlay({el: $('#test')});
});
