import handler from "../../../utils/handler";
import isAuth from "../../../middlewares/isAuth";
import {findOne} from '../../../controllers/project';

export default handler().use(isAuth).get(findOne);