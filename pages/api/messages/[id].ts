import isAuth from "../../../middlewares/isAuth";
import handler from "../../../utils/handler";
import { viewMessage } from "../../../controllers/message";

export default handler().use(isAuth).patch(viewMessage);