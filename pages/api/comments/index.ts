import handler from "../../../utils/handler";
import isAuth from "../../../middlewares/isAuth";
import {find, create} from '../../../controllers/comment';

export default handler().use(isAuth).get(find).post(create);