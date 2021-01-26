import {
    createLayerComponent,

    MediaOverlayProps, updateMediaOverlay
} from '@react-leaflet/core';
import {
    LatLngBounds,

    VideoOverlay as LeafletVideoOverlay
} from 'leaflet';
import { ReactNode } from 'react';
import { canvasOverlay } from './CanvasOverlay';


export interface CanvasOverlayProps extends MediaOverlayProps {
    children?: ReactNode
    canvas: HTMLCanvasElement
    width?: number;
    height?: number;
    bounds: LatLngBounds;
}

export default createLayerComponent<
    LeafletVideoOverlay,
    CanvasOverlayProps
>(
    function createCanvasOverlay({ bounds, canvas, ...options }, ctx) {
        const instance = new (canvasOverlay as any)(canvas, bounds, options)
        const { width, height } = options;
        canvas.width = width || canvas.width;
        canvas.height = height || canvas.height;
        return { instance, context: { ...ctx, overlayContainer: instance } }
    },
    function updateCanvasOverlay(overlay, props, prevProps) {
        updateMediaOverlay(overlay, props, prevProps);

        if (props.width && prevProps.width !== props.width || prevProps.height !== props.height) {
            const canvas = (overlay.getElement() as unknown) as HTMLCanvasElement;
            if (typeof props.width === 'number') {
                canvas.width = props.width;
            }
            if (typeof props.height === 'number') {
                canvas.height = props.height;
            }
        }
    },
)
