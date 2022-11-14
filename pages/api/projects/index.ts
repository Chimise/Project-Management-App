import handler from "../../../utils/handler";
import isAuth from "../../../middlewares/isAuth";
import {create, find} from '../../../controllers/project';

export default handler().use(isAuth).get(find).post(create);