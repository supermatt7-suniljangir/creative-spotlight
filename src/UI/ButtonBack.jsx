import {FaArrowLeft} from "react-icons/fa";
import { Link } from 'react-router-dom';

function ButtonBack() {
return <Link to={-1}>
{" "}
<button className="flex items-center absolute top-0 gap-2 bg-[var(--bg-secondary)] px-2 py-2 rounded-full">
  <FaArrowLeft />
</button>
</Link>

}

export default ButtonBack