describe("simple event", function() {

	beforeEach(function() {
		SimpleEvent.reset();
	});

	it("should add event handler to a list", function() {
		expect(SimpleEvent.events.length).toEqual(0);

		SimpleEvent.on({}, "change", function(){ });

		expect(SimpleEvent.events.length).toEqual(1);

		SimpleEvent.on({}, "change", function(){ var test; });

		expect(SimpleEvent.events.length).toEqual(2);
	});

	it("should remove event handlers from a list", function() {
		var target = {};

		SimpleEvent.on(target, "change", function(){ var test; });
		SimpleEvent.on(target, "change", function(){});

		SimpleEvent.off(target, "change");

		expect(SimpleEvent.events.length).toEqual(0);
	});

	it("should remove all event handlers", function() {
		var target = {};

		SimpleEvent.on(target, "change", function(){ var test; });
		SimpleEvent.on(target, "change", function(){});

		SimpleEvent.off(target, "change");

		expect(SimpleEvent.events.length).toEqual(0);
	});

	it("should remove event handler from a list with callback", function() {
		var target = {};
		var testFunc = function () {};

		SimpleEvent.on(target, "change", function(){ var test; });
		SimpleEvent.on(target, "change", testFunc);

		SimpleEvent.off(target, "change", testFunc);

		expect(SimpleEvent.events.length).toEqual(1);
	});

	it("should emit an event", function() {
		var target = {
			changed: false,
			change: function(){
				SimpleEvent.emit(this, 'change');
			}
		};

		expect(target.changed).toEqual(false);

		SimpleEvent.on(target, "change", function(){
			target.changed = true;
		});

		target.change();

		expect(target.changed).toEqual(true);
	});

	it("should emit an event with parameters", function() {
		var target = {
			changed: false,
			value: '',
			change: function(){
				SimpleEvent.emit(this, 'change', 'x', 'y', 'z');
			}
		};

		expect(target.changed).toEqual(false);

		SimpleEvent.on(target, "change", function(x, y, z){
			target.changed = true;
			target.value = x + y + z;
		});

		target.change();

		expect(target.value).toEqual('xyz');
	});
});
