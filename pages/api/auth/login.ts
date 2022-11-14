import nc from '../../../utils/handler';
import {logIn} from '../../../controllers/auth';

const handler = nc().post(logIn);

export default handler;