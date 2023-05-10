import { useEffect } from 'react';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview';
import Resizable from '../code-editor/resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useCumulativeCode, useTypedSelector } from '../../hooks';
import './code-cell.css';
interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode);
            return;
        }
        const debounce = setTimeout(() => {
            createBundle(cell.id, cumulativeCode);
        }, 750);
        return () => {
            clearTimeout(debounce);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cumulativeCode, cell.id, createBundle]);
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
