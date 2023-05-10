import { useTypedSelector } from './use-typed-selector';

const s = () =>
    `
        import _React from 'react'; 
        import _ReactDOM from 'react-dom';
        var show = (value) => {
            const root = document.querySelector('#root');
            if(typeof value === 'object') {
                if (value.$$typeof && value.props) {
                    _ReactDOM.render(value, root)
                } else {
                    root.innerHTML = JSON.stringify(value)
                }
            } else {
                root.innerHTML = value;
            }
            return root;
            
            
        }
    `;

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);
        const showFuncNoop = 'var show = () => {}';

        const showFunc = s();

        const results = [];
        for (let c of orderedCells) {
            if (c.type === 'code') {
                if (c.id === cellId) {
                    results.push(showFunc);
                } else {
                    results.push(showFuncNoop);
                }
                results.push(c.content);
            }
            if (c.id === cellId) {
                break;
            }
        }
        return results;
    }).join('\n');
};
