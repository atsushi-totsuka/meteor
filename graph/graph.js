
Data = new Mongo.Collection("data");

if (Meteor.isClient) {
  Template.graph.helpers({
    data: function () {
      return Data.find();
    }
  });

  Template.graph.events({
    'click #show_pie_chart': function(){
      var records = Data.find().fetch();
      var array = [];
      $.each( records,function(){
        array.push({ label: this.name, value: this.value });
      })
      $("#chart svg").remove();
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
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Data.remove({});
  });
}
