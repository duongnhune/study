import type { Widget } from '@breezingin/breezing-shared';

export class WidgetFactory {

    static parseWidget<T = Widget>(widget: Widget): T {
        return {
            ...widget,
            props: this.parseProps(widget.props, {})
        } as T;
    }

    private static parseProps<T>(props: any, defaultProps: T): T {
        if (typeof props === 'string') {
            try {
                props = JSON.parse(props);
            } catch (error) {
                Logger.error('failed to parse props:', { props });
                return defaultProps;
            }
        }
        return { ...defaultProps, ...props };
    }
}