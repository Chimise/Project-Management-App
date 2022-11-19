import handler from "../../../utils/handler";
import isAuth from "../../../middlewares/isAuth";
import {updateOne, findOne, deleteOne} from '../../../controllers/task';

export default handler().use(isAuth).put(updateOne).get(findOne).delete(deleteOne)