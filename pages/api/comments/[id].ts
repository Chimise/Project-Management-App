import handler from "../../../utils/handler";
import isAuth from "../../../middlewares/isAuth";
import {findOne, updateOne, deleteOne} from '../../../controllers/comment';

export default handler().use(isAuth).get(findOne).put(updateOne).delete(deleteOne);