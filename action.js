class Action {

	constructor(graphContext) {
		this.canvas = window.interactiveCanvas;
		const that = this;
		this.graphContext = graphContext;
		this.commands = {
			ADDNODE: function(data) {
				that.addNode(data.label);
			},
			ADDEDGE: function(data) {
				that.addEdge(data.from, data.to, data.label);
			},
			DELETEALL: function() {
				that.deleteAll();
			},
			ADDRANDOMER: function(data) {
				that.addNetworkER(data.network_type, data.n, data.p);
			},
			ADDRANDOMWS: function(data) {
				that.addNetworkWS(data.network_type, data.n, data.k, data.b);
			},
			ADDRANDOMBA: function(data) {
				that.addNetworkBA(data.network_type, data.n, data.d);
			},
			DEFAULT: function() {
				// do nothing, when no command is found
			},
		};
	}

  /**
   * Register all callbacks used by Google Assistant Action
   * executed during creation time.
   */
  setCallbacks() {

    const that = this;
    // declare assistant canvas action callbacks
    const callbacks = {
	    onUpdate(data) {
		    that.commands[data.command ? data.command.toUpperCase() : 'DEFAULT'](data);
	    },
    };
    // called by the Interactive Canvas web app once web app has loaded to
    // register callbacks
    this.canvas.ready(callbacks);
  }
  
  addNode(label) {
	  this.graphContext.cy.add({
		  group: 'nodes',
		  data: { id:label, label: label, weight: 10}
	  });
	this.graphContext.cy.fit();
	this.canvas.sendTextQuery(`Node added`);
  }
  
   addEdge(from, to, label) {
	   this.graphContext.cy.add({
		   group: 'edges', data: { id: from+"_"+to, source: from, target: to, label: label }
	   });
	   this.graphContext.cy.fit();
	   this.canvas.sendTextQuery(`Edge added`);
   }
   
   deleteAll(network_type) {
	   this.graphContext.cy.elements().remove();
	   this.canvas.sendTextQuery(`All deleted`);
   }
   
   addNetworkER(network_type, n, p) {
	   console.log('addNetworkER');
	   var sn = new SimpleNets();
	   var es = sn.erdos(n,p);
	   es = es.toCy();
	   
	   var cy = cytoscape({
			  container: this.graphContext.cy.container(), // container to render in
			  elements: {
				nodes: es.nodes,
				edges: es.edges
			 },
			 style: cytoscape.stylesheet()
				.selector('node')
				.style({
						'content': 'data(id)',
						'background-color': '#ff004d',
					})
			});
			var layout = cy.layout({
			  name: 'cola'
			});

	   layout.run();
	   this.graphContext.cy.fit();
	   this.canvas.sendTextQuery(`Network added`);
   }
   
   addNetworkWS(network_type, n, k, b) {
	   console.log('addNetworkWS');
	   var sn = new SimpleNets();
	   var es = sn.wattsStrogatz(n, k, b);
	   es = es.toCy();
	   
	   var cy = cytoscape({
			  container: this.graphContext.cy.container(), // container to render in
			  elements: {
				nodes: es.nodes,
				edges: es.edges
			 },
			 style: cytoscape.stylesheet()
				.selector('node')
				.style({
						'content': 'data(id)',
						'background-color': '#ff004d',
					})
			});
			var layout = cy.layout({
			  name: 'circle'
			});

	   layout.run();
	   this.graphContext.cy.fit();
	   this.canvas.sendTextQuery(`Network added`);
   }
   
   addNetworkBA(network_type, n, d) {
	   console.log('addNetworkBA');
	   var sn = new SimpleNets();
	   var es = sn.barabasiAlbert(n,d);
	   es = es[es.length-1].toCy();
	   
	   var cy = cytoscape({
			  container: this.graphContext.cy.container(), // container to render in
			  elements: {
				nodes: es.nodes,
				edges: es.edges
			 },
			 style: cytoscape.stylesheet()
				.selector('node')
				.style({
						'content': 'data(id)',
						'background-color': '#ff004d',
					})
			});
			var layout = cy.layout({
			  name: 'cola'
			});

	   layout.run();
	   this.graphContext.cy.fit();
	   this.canvas.sendTextQuery(`Network added`);
   }
}
