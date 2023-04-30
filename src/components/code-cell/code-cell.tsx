import { useEffect } from 'react';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview';
import Resizable from '../code-editor/resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks';
import './code-cell.css';
interface CodeCellProps {
    cell: Cell;
}
const s = () =>
    `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        const show = (value) => {
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
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    const cumulativeCode = useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);
        const results = [s()];
        for (let c of orderedCells) {
            if (c.type === 'code') {
                results.push(c.content);
            }
            if (c.id === cell.id) {
                break;
            }
        }
        return results;
    });
    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode.join('\n'));
            return;
        }
        const debounce = setTimeout(() => {
            createBundle(cell.id, cumulativeCode.join('\n'));
        }, 750);
        return () => {
            clearTimeout(debounce);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cumulativeCode.join('\n'), cell.id, createBundle]);
    return (
        <Resizable direction="vertical">
            <div
                style={{
                    display: 'flex',
                    height: 'calc(100% - 10px)',
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        onChange={(value) => updateCell(cell.id, value)}
                        initialValue={cell.content}
                    />
                </Resizable>
                <div className="progress-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className="progress-cover">
                            <progress
                                className="progress is-small is-primary"
                                max="100"
                            >
                                Loading
                            </progress>
                        </div>
                    ) : (
                        <Preview
                            code={bundle.code}
                            bundlingStatus={bundle.err}
                        />
                    )}
                </div>
            </div>
        </Resizable>
    );
};

export default CodeCell;
