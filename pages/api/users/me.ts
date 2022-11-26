import handler from '../../../utils/handler';
import { currentUser } from '../../../controllers/user';
import isAuth from '../../../middlewares/isAuth';

export default handler().use(isAuth).get(currentUser);