import handler from '../../../utils/handler';
import { currentUser } from '../../../controllers/user';

export default handler().get(currentUser);