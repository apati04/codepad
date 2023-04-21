import { useEffect } from 'react';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview';
import Resizable from '../code-editor/resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    useEffect(() => {
        const debounce = setTimeout(() => {
            createBundle(cell.id, cell.content);
        }, 750);
        return () => {
            clearTimeout(debounce);
        };
    }, [cell.content, cell.id, createBundle]);
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
                {bundle && (
                    <Preview code={bundle.code} bundlingStatus={bundle.err} />
                )}
            </div>
        </Resizable>
    );
};

export default CodeCell;
