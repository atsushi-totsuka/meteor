
Data = new Mongo.Collection("data");
Data.insert({ name: "a", value: 100 });
Data.insert({ name: "b", value: 200 });
Data.insert({ name: "c", value: 300 });

if (Meteor.isClient) {
  Template.graph.helpers({
    data: function () {
      return Data.find();
    }
  });
  Template.graph.rendered = function(){
    var records = Data.find().fetch();
    var array = [];
    $.each( records,function(){
      array.push({ label: this.name, value: this.value });
    })
    var pie = new d3pie("chart", {
      header: {
        title: {
          text: "sample chart"
        }
      },
      size: {
        pieOuterRadius: "100%",
        canvasHeight: 360
      },
      data: {
        content: array
      },
    });
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Data.remove({});
  });
}
