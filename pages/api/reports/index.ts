import isAuth from "../../../middlewares/isAuth";
import handler from "../../../utils/handler";
import { find } from "../../../controllers/report";

export default handler().use(isAuth).get(find);