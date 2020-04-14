window.onload = () => {
	var cy = cytoscape({
	container: document.getElementById('cy'), // container to render in
	layout: {
		name: 'cola'
		},
		style: [
			{
				selector: 'node',
				css: {
					'background-color': '#f92411',
					 'label': 'data(label)'
				}
			},
			{
				selector: 'edge',
				css: {
					'line-color': '#f92411',
					'label': 'data(label)'
					}
			}
			],
	});
	this.cy = cy;
	this.action = new Action(this);
    // Call setCallbacks to register assistant action callbacks.
    this.action.setCallbacks();
  	window.focus();
};
