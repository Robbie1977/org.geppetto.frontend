/*******************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2011, 2013 OpenWorm.
 * http://openworm.org
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the MIT License
 * which accompanies this distribution, and is available at
 * http://opensource.org/licenses/MIT
 *
 * Contributors:
 *      OpenWorm - http://openworm.org/people.html
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 *******************************************************************************/

/**
 * Class used to create widgets and handle widget events from parent class.
 */
define(function(require) {
	
	PlotsController = require('widgets/plot/controllers/PlotsController');
	Scatter3dController = require('widgets/scatter3d/controllers/Scatter3dController');
	ConnectivityController = require('widgets/connectivity/controllers/ConnectivityController');
	PopupsController = require('widgets/popup/controllers/PopupController');
	TreeVisualiserControllerD3 = require('widgets/treevisualiser/treevisualiserd3/controllers/TreeVisualiserControllerD3');
	TreeVisualiserControllerDAT = require('widgets/treevisualiser/treevisualiserdat/controllers/TreeVisualiserControllerDAT');
	VariableVisualizerController = require('widgets/variablevisualiser/controllers/VariableVisualiserController');
	ButtonBarController = require('widgets/buttonBar/controllers/ButtonBarController');
	
	return function(GEPPETTO) {
		
		/**
		 * 
		 * Widgets
		 * 
		 * Different types of widgets that exist
		 * 
		 * @enum
		 */
		GEPPETTO.Widgets = {
			PLOT : 0,
			POPUP : 1,
			SCATTER3D: 2,
			TREEVISUALISERDAT: 3,
			TREEVISUALISERD3: 4,
			VARIABLEVISUALISER: 5,
			CONNECTIVITY: 6,
			BUTTONBAR: 7 
		};

		/**
		 * @exports Widgets/GEPPETTO.WidgetFactory
		 */
		GEPPETTO.WidgetFactory = {
				
			plotsController : null,
			popupsController : null,
			connectivityController : null,
			scatter3dController : null,
			variableVisController : null,
			ButtonBarController : null,
			treeVisDatController : null,
			treeVis3DController : null,
			/**
			 * Adds widget to Geppetto
			 * 
			 * @param {GEPPETTO.Widgets}
			 *            widgetType - Widget to add to Geppetto
			 */
			addWidget : function(widgetType) {
				var widget = null;
				switch(widgetType) {
					//create plotting widget
					case GEPPETTO.Widgets.PLOT:
						widget = this.getController(GEPPETTO.Widgets.PLOT).addPlotWidget();
						break;
					//create popup widget
					case GEPPETTO.Widgets.POPUP:
						widget = this.getController(GEPPETTO.Widgets.POPUP).addPopupWidget();
						break;
					//create scatter widget			
					case GEPPETTO.Widgets.SCATTER3D:
						widget = this.getController(GEPPETTO.Widgets.SCATTER3D).addScatter3dWidget();
						break;
					//create tree visualiser DAT widget				
					case GEPPETTO.Widgets.TREEVISUALISERDAT:
						widget = this.getController(GEPPETTO.Widgets.TREEVISUALISERDAT).addTreeVisualiserDATWidget();
						break;
					//create tree visualiser D3 widget				
					case GEPPETTO.Widgets.TREEVISUALISERD3:
						widget = this.getController(GEPPETTO.Widgets.TREEVISUALISERD3).addTreeVisualiserD3Widget();
						break;
					//create variable visualiser widget
					case GEPPETTO.Widgets.VARIABLEVISUALISER:
						widget = this.getController(GEPPETTO.Widgets.VARIABLEVISUALISER).addVariableVisualiserWidget();
						break;
					//create connectivity widget
					case GEPPETTO.Widgets.CONNECTIVITY:
						widget = this.getController(GEPPETTO.Widgets.CONNECTIVITY).addConnectivityWidget();
						break;						
					//create button bar
					case GEPPETTO.Widgets.BUTTONBAR:
						widget = this.getController(GEPPETTO.Widgets.BUTTONBAR).addButtonBarWidget();
						break;						
					default:
						break;
				}

				return widget;
			},

			/**
			 * Removes widget from Geppetto
			 * 
			 * @param {GEPPETTO.Widgets}
			 *            widgetType - Widget to remove from Geppetto
			 */
			removeWidget: function(widgetType) {
				switch(widgetType) {
					//removes plotting widget from geppetto
					case GEPPETTO.Widgets.PLOT:
						this.getController(GEPPETTO.Widgets.PLOT).removePlotWidgets();
						return GEPPETTO.Resources.REMOVE_PLOT_WIDGETS;
					//removes popup widget from geppetto
					case GEPPETTO.Widgets.POPUP:
						this.getController(GEPPETTO.Widgets.POPUP).removePopupWidgets();
						return GEPPETTO.Resources.REMOVE_POPUP_WIDGETS;
					//removes scatter3d widget from geppetto
					case GEPPETTO.Widgets.SCATTER3D:
						this.getController(GEPPETTO.Widgets.SCATTER3D).removeScatter3dWidgets();
						return GEPPETTO.Resources.REMOVE_SCATTER3D_WIDGETS;	
					//removes tree visualiser DAT widget from geppetto						
					case GEPPETTO.Widgets.TREEVISUALISERDAT:
						this.getController(GEPPETTO.Widgets.TREEVISUALISERDAT).removeTreeVisualiserDATWidgets();
						return GEPPETTO.Resources.REMOVE_TREEVISUALISERDAT_WIDGETS;
					//removes tree visualiser D3 widget from geppetto												
					case GEPPETTO.Widgets.TREEVISUALISERD3:
						this.getController(GEPPETTO.Widgets.TREEVISUALISERD3).removeTreeVisualiserD3Widgets();
						return GEPPETTO.Resources.REMOVE_TREEVISUALISERD3_WIDGETS;
					//removes variable visualiser widget from geppetto
					case GEPPETTO.Widgets.VARIABLEVISUALISER:
						this.getController(GEPPETTO.Widgets.VARIABLEVISUALISER).removeVariableVisualiserWidgets();
						return GEPPETTO.Resources.REMOVE_VARIABLEVISUALISER_WIDGETS;
					//remove connectivity widget
					case GEPPETTO.Widgets.CONNECTIVITY:
						this.getController(GEPPETTO.Widgets.CONNECTIVITY).removeConnectivityWidget();
						return GEPPETTO.Resources.REMOVE_CONNECTIVITY_WIDGETS;
					//remove button bar widget from geppetto
					case GEPPETTO.Widgets.BUTTONBAR:
						this.getController(GEPPETTO.Widgets.BUTTONBAR).removeButtonBarWidget();
						return GEPPETTO.Resources.REMOVE_BUTTONBAR_WIDGETS;
					default:
						return GEPPETTO.Resources.NON_EXISTENT_WIDGETS;
				}
			},
			
			getController : function(type){
				if(type == GEPPETTO.Widgets.PLOT){
					if(this.plotsController == null || undefined){
						this.plotsController = new PlotsController();
					}
					return this.plotsController;
				}
				else if(type == GEPPETTO.Widgets.SCATTER3D){
					if(this.scatter3dController == null || undefined){
						this.scatter3dController = new Scatter3dController();
					}
					return this.scatter3dController;
				}
				else if(type == GEPPETTO.Widgets.POPUP){
					if(this.popupsController == null || undefined){
						this.popupsController = new PopupsController();
					}
					return this.popupsController;
				}
				else if(type == GEPPETTO.Widgets.TREEVISUALISERDAT){
					if(this.treeVisDatController == null || undefined){
						this.treeVisDatController = new TreeVisualiserControllerDAT();
					}
					return this.treeVisDatController;
				}
				else if(type == GEPPETTO.Widgets.TREEVISUALISERD3){
					if(this.treeVis3DController == null || undefined){
						this.treeVis3DController = new TreeVisualiserControllerD3();
					}
					return this.treeVis3DController;
				}
				else if(type == GEPPETTO.Widgets.VARIABLEVISUALISER){
					if(this.variableVisController == null || undefined){
						this.variableVisController = new VariableVisualizerController();
					}
					return this.variableVisController;
				}
				else if(type == GEPPETTO.Widgets.CONNECTIVITY){
					if(this.connectivityController == null || undefined){
						this.connectivityController = new ConnectivityController();
					}
					return this.connectivityController;
				}
				else if(type == GEPPETTO.Widgets.BUTTONBAR){
					if(this.buttonBarController == null || undefined){
						this.buttonBarController = new ButtonBarController();
					}
					return this.buttonBarController;
				}
				
			}
		};
	};
});
