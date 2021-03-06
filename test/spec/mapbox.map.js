describe("mapbox.map", function() {
    var globalsBefore = {};

    beforeEach(function(){
        for (var key in window)
            globalsBefore[key] = true;
    });

    afterEach(function(){
        var leaked = [];
        for (var key in window) {
            if (!(key in globalsBefore)) {
                if (key !== 'grid')leaked.push(key);
            }
        }
        if (leaked.length > 0) {
            throw new Error('Leaked global variables: [' + leaked.join(', ') + ']');
        }
    });

    it("behaves the same as unaffected modestmaps", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.addLayer(mapbox.markers.layer())).toEqual(m);
    });

    it("has ui, ease, interaction members", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.ease).toBeTruthy();
        expect(m.interaction).toBeTruthy();
        expect(m.ui).toBeTruthy();
    });

    it("proxied center method is a getter setter", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.center({ lat: 10, lon: 10 })).toEqual(m);
        expect(m.center().lat).toBeCloseTo(10);
        expect(m.center().lon).toBeCloseTo(10);
    });

    it("proxied zoom method is a getter setter", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.zoom(5)).toEqual(m);
        expect(m.zoom()).toEqual(5);
    });

    it("center zoom method sets both", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.centerzoom({ lat: 10, lon: 10 }, 5)).toEqual(m);
        expect(m.zoom(5)).toEqual(m);
        expect(m.zoom()).toEqual(5);
        expect(m.center().lat).toBeCloseTo(10);
        expect(m.center().lon).toBeCloseTo(10);
    });

    it("has a refresh method that is callable", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.addLayer(mapbox.markers.layer())).toEqual(m);
        expect(m.refresh()).toEqual(m);
    });

    it("has setPanLimits", function() {
        var locations = [
            { lat: -20, lon: 0 },
        { lat: 0, lon: 20 }];
        var m = mapbox.map(document.createElement('div'));
        expect(m.addLayer(mapbox.markers.layer())).toEqual(m);
        expect(m.setPanLimits(locations)).toEqual(m);
    });

    it("can set and reset smooth", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.smooth(false)).toEqual(m);
        expect(m.smooth(true)).toEqual(m);
    });
});
