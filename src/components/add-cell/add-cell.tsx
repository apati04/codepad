import { useActions } from "../../hooks/use-actions";
import "./add-cell.css";

// props: id of cell.
interface AddCellProps {
  nextCellId: string;
}
const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, "code")}>code</button>
      <button onClick={() => insertCellBefore(nextCellId, "text")}>text</button>
    </div>
  );
};
export default AddCell;
