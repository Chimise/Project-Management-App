import handler from '../../../utils/handler';
import {signUp} from '../../../controllers/auth';

export default handler().post(signUp);