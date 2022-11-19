import handler from "../../../utils/handler";
import isAuth from "../../../middlewares/isAuth";
import {find, create} from '../../../controllers/task';

export default handler().use(isAuth).get(find).post(create);