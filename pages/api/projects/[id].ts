import handler from "../../../utils/handler";
import isAuth from "../../../middlewares/isAuth";
import {findOne, deleteOne} from '../../../controllers/project';

export default handler().use(isAuth).get(findOne).delete(deleteOne);