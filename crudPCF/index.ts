import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import userComponent from "./components/userComponent";
import MarkdownViewer, { IMarkdownViewerProps } from './components/MarkdownViewer';

import "./css/style.css";


import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class crudPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private mContainer: HTMLDivElement;
	private props: IMarkdownViewerProps = {
		content:  "# This is a header\n\nAnd this is a paragraph\n\n* Item 1\n* Item 2\n\n**Code Example** (PowerShell):\n\n```PowerShell\nGet-ChildItem -Path \"C:\\Temp\" -Filter \"*.txt\" -Recurse\n```\n",
		fontSize: "Initial",
		overflow: "Auto"
	}


	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this.mContainer = container;
		context.mode.trackContainerResize(true);

		this.props.content  = context.parameters.Content.raw  || this.props.content;
		this.props.fontSize = context.parameters.FontSize.raw || this.props.fontSize;
		this.props.overflow = context.parameters.Overflow.raw || this.props.overflow;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this.props.content   = context.parameters.Content.raw  || this.props.content;
		this.props.fontSize  = context.parameters.FontSize.raw || this.props.fontSize;
		this.props.overflow  = context.parameters.Overflow.raw || this.props.overflow;
		try {
			this.props.maxHeight = context.mode.allocatedHeight > 0 ? context.mode.allocatedHeight + "px" : undefined;
			this.props.maxWidth  = context.mode.allocatedWidth  > 0 ? context.mode.allocatedWidth + "px"  : undefined;
		} catch (e) { this.props.content = e }

		ReactDOM.render(
			React.createElement(
				MarkdownViewer, this.props
			),
			this.mContainer
		);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this.mContainer);
	}
 }

