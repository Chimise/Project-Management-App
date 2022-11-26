import isAuth from "../../../middlewares/isAuth";
import handler from "../../../utils/handler";
import { find } from "../../../controllers/message";

export default handler().use(isAuth).get(find);