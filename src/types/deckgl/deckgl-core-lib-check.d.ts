import { AnyType } from "@interfaces/basic/Any.interface";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";

declare module "@deck.gl/core/lib/deck" {
    import Controller, { ControllerOptions } from "@deck.gl/core/controllers/controller";
    import Effect from "@deck.gl/core/lib/effect";
    import Layer from "@deck.gl/core/lib/layer";
    import LayerManager from "@deck.gl/core/lib/layer-manager";
    import Tooltip from "@deck.gl/core/lib/tooltip";
    import View from "@deck.gl/core/views/view";
    import Viewport from "@deck.gl/core/viewports/viewport";
    import { AnimationLoop } from "@luma.gl/core";

    export interface DeckProps<T = ContextProviderValue> {
        //https://deck.gl/#/documentation/deckgl-api-reference/deck?section=properties
        // https://github.com/visgl/deck.gl/blob/e948740f801cf91b541a9d7f3bba143ceac34ab2/modules/react/src/deckgl.js#L71-L72
        width: string | number;
        height: string | number;
        layers: Layer<AnyType>[];
        layerFilter: (args: {
            layer: Layer<AnyType>;
            viewport: Viewport;
            isPicking: boolean;
            renderPass: string;
        }) => boolean;
        getCursor: (interactiveState: InteractiveState) => string;
        views: View[];
        viewState: ViewStateProps;
        initialViewState: InitialViewStateProps;
        controller: null | Controller | ControllerOptions | boolean;
        effects: Effect[];
        _typedArrayManagerProps: {
            overAlloc?: number;
            poolSize?: number;
        };

        children: AnyType;

        //Configuration Properties
        id: string;
        style: AnyObject;
        parent: HTMLElement;
        canvas?: HTMLCanvasElement | string;
        touchAction: string;
        pickingRadius: number;
        getTooltip: <D>(info: PickInfo<D>) =>
            | null
            | string
            | {
                  text?: string;
                  html?: string;
                  className?: string;
                  style?: AnyObject;
              };
        useDevicePixels: boolean | number;
        gl: WebGLRenderingContext;
        glOptions: WebGLContextAttributes;
        _framebuffer: AnyType;
        parameters: object;
        debug: boolean;
        _animate: boolean;
        _pickable: boolean;

        //Event Callbacks
        onWebGLInitialized: (gl: WebGLRenderingContext) => AnyType;
        onViewStateChange: (args: {
            viewState: AnyType;
            interactionState: InteractionState;
            oldViewState: AnyType;
        }) => AnyType;
        onInteractionStateChange(interactionState: InteractionState): void;
        onHover: <D>(info: PickInfo<D>, e: MouseEvent) => AnyType;
        onClick: <D>(info: PickInfo<D>, e: MouseEvent) => AnyType;
        onDragStart: <D>(info: PickInfo<D>, e: MouseEvent) => AnyType;
        onDrag: <D>(info: PickInfo<D>, e: MouseEvent) => AnyType;
        onDragEnd: <D>(info: PickInfo<D>, e: MouseEvent) => AnyType;
        onLoad: () => void;
        onResize: (size: { height: number; width: number }) => void;
        onBeforeRender: (args: { gl: WebGLRenderingContext }) => void;
        onAfterRender: (args: { gl: WebGLRenderingContext }) => void;
        onError: (error: Error, source: AnyType) => void;
        _onMetrics: (metrics: MetricsPayload) => void;

        ContextProvider?: React.Provider<T>;

        userData: AnyType;
    }

    export default class Deck<T = ContextProviderValue> {
        constructor(props: Partial<DeckProps<T>>);
        animationLoop: AnimationLoop;
        canvas: HTMLCanvasElement;
        eventManager: AnyType;
        layerManager: LayerManager;
        tooltip: Tooltip;
        viewState: AnyType;
        width: number;
        height: number;
        finalize(): void;
        props: DeckProps<T>;
        setProps(props: Partial<DeckProps<T>>): void;
        needsRedraw(opts?: { clearRedrawFlags: boolean }): AnyType;
        redraw(force: AnyType): void;
        getViews(): AnyType;
        getViewports(rect: AnyType): AnyType;
        pickObject({
            x,
            y,
            radius,
            layerIds,
        }: {
            x: AnyType;
            y: AnyType;
            radius?: number;
            layerIds?: AnyType;
        }): AnyType;
        pickMultipleObjects({
            x,
            y,
            radius,
            layerIds,
            depth,
        }: {
            x: AnyType;
            y: AnyType;
            radius?: number;
            layerIds?: AnyType;
            depth?: number;
        }): AnyType;
        pickObjects({
            x,
            y,
            width,
            height,
            layerIds,
        }: {
            x: AnyType;
            y: AnyType;
            width?: number;
            height?: number;
            layerIds?: AnyType;
        }): AnyType;
        _pick(method: AnyType, statKey: AnyType, opts: AnyType): AnyType;
        _createCanvas(props: AnyType): AnyType;
        _setCanvasSize(props: AnyType): void;
        _updateCanvasSize(): void;
        _checkForCanvasSizeChange(): boolean;
        _createAnimationLoop(props: AnyType): AnyType;
        _getViewState(): AnyType;
        _getViews(): AnyType;
        _onPointerMove(event: AnyType): void;
        _pickAndCallback(): void;
        _updateCursor(): void;
        _setGLContext(gl: AnyType): void;
        _drawLayers(redrawReason: AnyType, renderOptions: AnyType): void;
        _onRendererInitialized({ gl }: { gl: AnyType }): void;
        _onRenderFrame(animationProps: AnyType): void;
        _onViewStateChange(params: AnyType): void;
        _onInteractiveStateChange({ isDragging }: { isDragging?: boolean }): void;
        _onEvent(event: AnyType): void;
        _onPointerDown(event: AnyType): void;
        _getFrameStats(): void;
        _getMetrics(): void;
    }
}
