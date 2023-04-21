import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [viewHeight, setViewHeight] = useState(window.innerHeight);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);
    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setViewHeight(window.innerHeight);
                setViewWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        };
    }, [width]);

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            minConstraints: [viewWidth * 0.2, Infinity],
            maxConstraints: [viewWidth * 0.75, Infinity],
            height: Infinity,
            width,
            onResizeStop: (e, data) => {
                setWidth(data.size.width);
            },
            resizeHandles: ['e'],
        };
    } else {
        resizableProps = {
            minConstraints: [Infinity, 24],
            maxConstraints: [Infinity, viewHeight * 0.9],
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
        };
    }
    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
