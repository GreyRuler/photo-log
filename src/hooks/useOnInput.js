import {useDispatch} from "react-redux";
import {catalogChangeQ} from "../reducers/catalog/slice";
import {useNavigate} from "react-router-dom";

export default function useOnInput() {
    const dispatch = useDispatch()
    return (e) => {
        dispatch(catalogChangeQ(e.target.value))
    }
}
